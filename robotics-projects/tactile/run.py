"""Synthetic tactile slip experiment. No real sensor data or real robot claims."""
from __future__ import annotations

import json
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public/robotics-lab/tactile"
DT, STEPS = 0.01, 500
FEATURES = ["normal_N", "shear_N", "shear_normal_ratio", "vibration_rms", "normal_change", "shear_change"]


def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -40, 40)))


def features(history):
    a = np.asarray(history[-8:])
    means = a.mean(0)
    return np.array([means[0], means[1], means[1] / max(means[0], .1), np.sqrt(np.mean(a[:, 2] ** 2)), a[-1, 0] - a[0, 0], a[-1, 1] - a[0, 1]])


def simulate(seed, mode="scripted", model=None, condition="nominal"):
    rng = np.random.default_rng(seed)
    mu = rng.uniform(.45, .85) if condition != "unseen-friction" else rng.uniform(.25, .40)
    noise = 2.5 if condition == "noisy" else 1.0
    mass = rng.uniform(.12, .22)
    disturbance = rng.uniform(.7, 1.8)
    onset = rng.uniform(1.2, 2.0)
    n = rng.uniform(2.0, 4.8) if mode == "scripted" else 3.0
    phase = rng.uniform(0, 6.28)
    history, rows, xs, ys, probs = [], [], [], [], []
    v = displacement = 0.0
    first_slip = first_detection = None
    for i in range(STEPS):
        t = i * DT
        # Downward gravity + smooth applied load. Total friction capacity is mu*N.
        load = mass * 9.81 + disturbance / (1 + np.exp(-8 * (t - onset)))
        load += .12 * np.sin(5 * t + phase)
        if mode == "scripted":
            n = max(.8, n + .012 * np.sin(3 * t + phase) + rng.normal(0, .018))
        capacity = mu * n
        if v <= 0 and load <= capacity:
            v = 0.0
        else:
            acceleration = (load - .85 * capacity - .8 * v) / mass
            v = max(0., v + acceleration * DT)
        displacement += v * DT
        slipping = v > .003
        shear = min(load, capacity) + rng.normal(0, .025 * noise)
        normal = n + rng.normal(0, .035 * noise)
        # Explicit synthetic transducer model: sliding generates extra vibration.
        vibration = rng.normal(0, (.018 + .24 * np.sqrt(min(v, 1.0))) * noise)
        history.append([normal, shear, vibration])
        x = features(history)
        p = float(sigmoid(((x - model["mean"]) / model["std"]) @ model["weights"] + model["bias"])) if model else 0.
        alarm = p >= model["threshold"] if mode == "learned" else (x[3] > .055 if mode == "threshold" else False)
        if slipping and first_slip is None:
            first_slip = t
        if first_slip is not None and alarm and first_detection is None:
            first_detection = t
        if mode in ("threshold", "learned"):
            # Same causal controller and bounds; only detector changes.
            n = float(np.clip(n + (26.0 if alarm else -.12) * DT, 2.8, 9.0))
        xs.append(x)
        ys.append(int(slipping))
        probs.append(p)
        rows.append([round(t, 3), round(normal, 5), round(shear, 5), round(vibration, 5), round(v, 5), round(displacement, 5), int(slipping), int(alarm), round(p, 5)])
    return {"seed": seed, "condition": condition, "mu": float(mu), "mass_kg": float(mass), "mode": mode, "rows": rows, "dropped": bool(displacement > .08), "peak_force_N": max(r[1] for r in rows), "mean_force_N": float(np.mean([r[1] for r in rows])), "displacement_m": float(displacement), "detection_delay_s": None if first_detection is None or first_slip is None else round(first_detection - first_slip, 4), "X": np.asarray(xs), "y": np.asarray(ys), "p": np.asarray(probs)}


def scores(y, pred):
    tp = int(np.sum((y == 1) & pred)); fp = int(np.sum((y == 0) & pred)); fn = int(np.sum((y == 1) & ~pred)); tn = int(np.sum((y == 0) & ~pred))
    precision = tp / max(1, tp + fp); recall = tp / max(1, tp + fn)
    return {"precision": precision, "recall": recall, "f1": 2 * precision * recall / max(1e-12, precision + recall), "tp": tp, "fp": fp, "fn": fn, "tn": tn}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    split = {"train": list(range(1000, 1120)), "validation": list(range(2000, 2030)), "test": list(range(3000, 3040))}
    episodes = {k: [simulate(s) for s in seeds] for k, seeds in split.items()}
    x = np.concatenate([e["X"] for e in episodes["train"]]); y = np.concatenate([e["y"] for e in episodes["train"]])
    mean, std = x.mean(0), np.maximum(x.std(0), 1e-5)
    z = (x - mean) / std
    weights = np.zeros(z.shape[1]); bias = 0.
    rng = np.random.default_rng(42)
    history = []
    xv = np.concatenate([e["X"] for e in episodes["validation"]]); yv = np.concatenate([e["y"] for e in episodes["validation"]])
    for epoch in range(160):
        order = rng.permutation(len(z))
        for idx in np.array_split(order, 24):
            err = sigmoid(z[idx] @ weights + bias) - y[idx]
            weights -= .05 * (z[idx].T @ err / len(idx) + 1e-4 * weights)
            bias -= .05 * err.mean()
        pv = sigmoid((xv - mean) / std @ weights + bias)
        if epoch % 4 == 0 or epoch == 159:
            p = sigmoid(z @ weights + bias)
            history.append({"epoch": epoch + 1, "train_bce": float(-np.mean(y * np.log(p + 1e-8) + (1-y) * np.log(1-p + 1e-8))), "validation_bce": float(-np.mean(yv * np.log(pv + 1e-8) + (1-yv) * np.log(1-pv + 1e-8)))})
    candidates = [(scores(yv, pv >= t)["f1"], t) for t in np.arange(.1, .91, .025)]
    threshold = float(max(candidates)[1])
    model = {"mean": mean, "std": std, "weights": weights, "bias": float(bias), "threshold": threshold}
    xt = np.concatenate([e["X"] for e in episodes["test"]]); yt = np.concatenate([e["y"] for e in episodes["test"]])
    pt = sigmoid((xt - mean) / std @ weights + bias)
    classification = {"learned": scores(yt, pt >= threshold), "threshold": scores(yt, xt[:, 3] > .055), "fixed": scores(yt, np.zeros(len(yt), dtype=bool))}
    classification_conditions = {"nominal": classification}
    for condition in ["noisy", "unseen-friction"]:
        condition_runs = [simulate(s, "scripted", model, condition) for s in split["test"]]
        cx = np.concatenate([e["X"] for e in condition_runs]); cy = np.concatenate([e["y"] for e in condition_runs])
        cp = sigmoid((cx - mean) / std @ weights + bias)
        classification_conditions[condition] = {"learned": scores(cy, cp >= threshold), "threshold": scores(cy, cx[:, 3] > .055), "fixed": scores(cy, np.zeros(len(cy), dtype=bool))}
    closed_loop, cases = [], []
    for ci, condition in enumerate(["nominal", "noisy", "unseen-friction"]):
        for mode in ["fixed", "threshold", "learned"]:
            runs = [simulate(5000 + ci * 100 + s, mode, model, condition) for s in range(40)]
            delays = [e["detection_delay_s"] for e in runs if e["detection_delay_s"] is not None]
            closed_loop.append({"condition": condition, "mode": mode, "episodes": len(runs), "drop_rate": float(np.mean([e["dropped"] for e in runs])), "mean_force_N": float(np.mean([e["mean_force_N"] for e in runs])), "mean_peak_force_N": float(np.mean([e["peak_force_N"] for e in runs])), "mean_displacement_m": float(np.mean([e["displacement_m"] for e in runs])), "mean_detection_delay_s": float(np.mean(delays)) if delays else None, "detected_slip_episodes": len(delays)})
            # All cases are preserved, including failures; UI selects seed/mode.
            for e in runs:
                cases.append({k: v for k, v in e.items() if k not in ("X", "y", "p")})
    serial_model = {k: v.tolist() if isinstance(v, np.ndarray) else v for k, v in model.items()}
    result = {"schema_version": 1, "project": "tactile", "evidence": "synthetic physics-reference experiment; no real sensors", "seed": 42, "dt_s": DT, "steps": STEPS, "columns": ["time_s", "normal_N", "shear_N", "vibration_au", "slip_velocity_m_s", "displacement_m", "reference_slip", "alarm", "learned_probability"], "split_episode_ids": split, "features": FEATURES, "model": serial_model, "training_history": history, "classification_test": classification, "classification_conditions": classification_conditions, "closed_loop": closed_loop, "case_count": len(cases), "cases": cases, "limitations": ["Synthetic vibration explicitly depends on simulated sliding speed; real-domain transfer is not evaluated.", "Coulomb-like 1D contact; no torsion, contact-patch mechanics or hardware latency.", "Virtual contact persists after exceeding the 80 mm slip budget for diagnostics; not a post-drop physical model.", "Metrics compare this fixed synthetic generator and its random conditions only; not calibrated tactile-sensor accuracy."]}
    # Save machine-readable artifacts using deterministic JSON; arrays are generated outputs.
    (OUT / "results.json").write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":"), allow_nan=False), encoding="utf-8")
    # Small initial payload; full matched-controller groups are loaded on demand.
    manifest_cases = []
    for ci, condition in enumerate(["nominal", "noisy", "unseen-friction"]):
        for mode in ["fixed", "threshold", "learned"]:
            group = [c for c in cases if c["condition"] == condition and c["mode"] == mode]
            (OUT / f"cases-{condition}-{mode}.json").write_text(json.dumps(group, separators=(",", ":"), allow_nan=False), encoding="utf-8")
            for j, case in enumerate(group):
                manifest_cases.append({**case, "rows": case["rows"] if j == 0 else []})
    manifest = {**result, "cases": manifest_cases}
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, separators=(",", ":"), allow_nan=False), encoding="utf-8")
    (OUT / "model.json").write_text(json.dumps(serial_model, indent=2), encoding="utf-8")
    np.savez_compressed(Path(__file__).parent / "dataset.npz", train_x=x, train_y=y, validation_x=xv, validation_y=yv, test_x=xt, test_y=yt)
    print(json.dumps({"classification_test": classification, "closed_loop": closed_loop}, indent=2))


if __name__ == "__main__":
    main()
