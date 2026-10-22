"""CPU-only MuJoCo grasp benchmark. No welded object, scripted object motion or success model."""
from __future__ import annotations

import argparse
import collections
import hashlib
import json
import math
import platform
import sys
from pathlib import Path

import mujoco
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "robotics-lab"
DT = 0.002
DURATION = 3.8
SHAPES = {
    "cube": {"type": "box", "size": [0.025, 0.025, 0.025]},
    "cylinder": {"type": "cylinder", "size": [0.022, 0.025]},
    "plate": {"type": "box", "size": [0.007, 0.030, 0.025]},
}
VERSION = "parallel-jaw-mujoco-v1"


def make_xml(c: dict) -> str:
    s = SHAPES[c["shape"]]
    size = " ".join(str(x) for x in s["size"])
    # z stage and jaws are actuated dynamical bodies; the object has a free joint.
    return f'''<mujoco model="auditable_parallel_jaw">
 <compiler angle="radian"/>
 <option timestep="{DT}" gravity="0 0 -9.81" integrator="implicitfast" cone="elliptic" iterations="80"/>
 <default><joint damping="1" armature="0.002"/><geom solref="0.012 1" solimp="0.9 0.95 0.001" condim="4" friction="{c['friction']} 0.003 0.0001"/></default>
 <worldbody>
  <geom name="floor" type="plane" size="0.5 0.5 0.02" friction="0.5 0.003 0.0001"/>
  <body name="object" pos="{c['offset']} 0 0.026" euler="0 0 {c['yaw']}">
   <freejoint name="object_free"/><geom name="object_geom" type="{s['type']}" size="{size}" mass="{c['mass']}" rgba="0.9 0.48 0.15 1"/>
  </body>
  <body name="stage" pos="0 0 0.046">
   <joint name="lift" type="slide" axis="0 0 1" range="0 0.14"/>
   <geom name="bridge" type="box" pos="0 0 0.070" size="0.09 0.015 0.008" mass="0.3" contype="0" conaffinity="0"/>
   <body name="left" pos="-0.065 0 0">
    <joint name="left_close" type="slide" axis="1 0 0" range="0 0.057"/>
    <geom name="left_pad" type="box" size="0.006 0.035 0.030" mass="0.05" rgba="0.13 0.48 0.62 1"/>
   </body>
   <body name="right" pos="0.065 0 0">
    <joint name="right_close" type="slide" axis="-1 0 0" range="0 0.057"/>
    <geom name="right_pad" type="box" size="0.006 0.035 0.030" mass="0.05" rgba="0.13 0.48 0.62 1"/>
   </body>
  </body>
 </worldbody>
 <actuator>
  <position name="lift_servo" joint="lift" kp="2200" kv="75" ctrllimited="true" ctrlrange="0 0.14" forcelimited="true" forcerange="-35 35"/>
  <position name="left_servo" joint="left_close" kp="900" kv="10" ctrllimited="true" ctrlrange="0 0.057" forcelimited="true" forcerange="-12 12"/>
  <position name="right_servo" joint="right_close" kp="900" kv="10" ctrllimited="true" ctrlrange="0 0.057" forcelimited="true" forcerange="-12 12"/>
 </actuator>
</mujoco>'''


def condition(seed: int, shape: str, domain: str) -> dict:
    rng = np.random.default_rng(seed)
    c = dict(seed=seed, shape=shape, friction=0.75, mass=0.10, offset=0.0, yaw=0.0,
             delay=0.0, noise=0.0)
    if domain == "grasp":
        c.update(friction=float(rng.uniform(.22, .85)), mass=float(rng.uniform(.08, .22)),
                 offset=float(rng.uniform(-.007, .007)), yaw=float(rng.uniform(-.16, .16)))
    elif domain in ("physics", "full"):
        c.update(friction=float(rng.uniform(.16, .88)), mass=float(rng.uniform(.07, .24)),
                 offset=float(rng.uniform(-.009, .009)), yaw=float(rng.uniform(-.20, .20)))
        if domain == "full":
            c.update(delay=float(rng.uniform(.02, .10)), noise=float(rng.uniform(.0005, .002)))
    elif domain == "heldout":
        c.update(friction=float(rng.uniform(.18, .65)), mass=float(rng.uniform(.10, .23)),
                 offset=float(rng.uniform(-.008, .008)), yaw=float(rng.uniform(-.18, .18)),
                 delay=float(rng.uniform(.025, .105)), noise=float(rng.uniform(.0005, .002)))
    return c


def run(c: dict, method: str, force: float = 2.6, lift_time: float = 1.2,
        record: bool = False) -> dict:
    xml = make_xml(c)
    m = mujoco.MjModel.from_xml_string(xml)
    d = mujoco.MjData(m)
    mujoco.mj_forward(m, d)
    object_joint = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_JOINT, "object_free")
    object_q = int(m.jnt_qposadr[object_joint])
    og = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, "object_geom")
    pads = [mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, x) for x in ("left_pad", "right_pad")]
    joints = [mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_JOINT, x) for x in ("lift", "left_close", "right_close")]
    qi = [int(m.jnt_qposadr[j]) for j in joints]
    rng = np.random.default_rng(c["seed"] + 900000)
    target = np.zeros(2)
    history = collections.deque([np.zeros(2)], maxlen=max(1, round(c["delay"] / .01) + 1))
    frames, hold_z, forces, max_lift = [], [], [], 0.0
    contact_steps = 0
    energy = 0.0
    normals = np.zeros(2)
    cf = np.zeros(6)
    nstep = round(DURATION / DT)
    for step in range(nstep):
        t = step * DT
        if step % 5 == 0:
            normals[:] = 0
            for ci in range(d.ncon):
                ct = d.contact[ci]
                if og not in (ct.geom1, ct.geom2):
                    continue
                for pi, pg in enumerate(pads):
                    if pg in (ct.geom1, ct.geom2):
                        mujoco.mj_contactForce(m, d, ci, cf)
                        normals[pi] += abs(float(cf[0]))
            history.append(normals.copy())
            sensed = history[0]
            if t < .25:
                target[:] = 0
            elif method == "fixed_gap":
                target[:] = min(.043, (t - .25) * .075)
            elif method == "geometry":
                width = SHAPES[c["shape"]]["size"][0]
                desired = .065 - .006 - width + .003
                # Nominal geometry only: does not know actual yaw or displacement.
                target[:] = min(desired, (t - .25) * .075)
            else:
                # Independent incremental jaw closure, with delayed contact-force feedback.
                # Position noise is sampled before each command, not added to the success metric.
                delta = np.where(sensed < .10, .075,
                                 np.clip((force - sensed) * .003, -.03, .03)) * .01
                target[:] = np.clip(target + delta, 0, .057)
                target[:] = np.clip(target + rng.normal(0, c["noise"] * .08, 2), 0, .057)
        lift_phase = np.clip((t - 1.35) / lift_time, 0, 1)
        smooth = lift_phase * lift_phase * (3 - 2 * lift_phase)
        d.ctrl[:] = [.125 * smooth, target[0], target[1]]
        mujoco.mj_step(m, d)
        object_state = d.qpos[object_q:object_q+7]
        z = float(object_state[2])
        max_lift = max(max_lift, z - .025)
        if t >= 3.1:
            hold_z.append(z)
        forces.append(float(max(normals)))
        if min(normals) > .05:
            contact_steps += 1
        energy += float(np.sum(np.abs(d.actuator_force * d.actuator_velocity))) * DT
        if record and step % 10 == 0:
            # qpos is the integrated state; derived xpos can lag the integrator by one step.
            frames.append({"t": round(float(d.time), 4), "object": np.round(object_state[:3], 6).tolist(),
                           "quat": np.round(object_state[3:7], 6).tolist(),
                           "jaws": [round(float(d.qpos[x]), 6) for x in qi],
                           "normal": np.round(normals, 4).tolist(),
                           "contacts": int(sum(og in (d.contact[k].geom1, d.contact[k].geom2) for k in range(d.ncon))),
                           "contactPositions": [np.round(d.contact[k].pos, 6).tolist() for k in range(d.ncon)
                                                if og in (d.contact[k].geom1, d.contact[k].geom2)],
                           "actuatorForce": np.round(d.actuator_force, 4).tolist()})
    hold_min = min(hold_z)
    warning_count = int(sum(w.number for w in d.warning))
    finite = bool(np.isfinite(d.qpos).all() and np.isfinite(d.qvel).all())
    success = hold_min >= .105 and abs(float(object_state[0])) < .06 and finite and warning_count == 0
    result = {"seed": c["seed"], "shape": c["shape"], "method": method, "condition": c,
              "policy": {"forceTargetN": force, "liftTimeS": lift_time}, "success": bool(success),
              "holdMinHeightM": round(hold_min, 6), "maxLiftM": round(max_lift, 6),
              "peakNormalN": round(max(forces), 4), "bilateralContactFraction": round(contact_steps / nstep, 4),
              "actuatorAbsWorkJ": round(energy, 6), "mjSteps": nstep,
              "finalObjectPositionM": np.round(object_state[:3], 6).tolist(),
              "warningCount": warning_count, "finiteState": finite,
              "failure": None if success else ("numerical_warning" if warning_count or not finite else
                                               "no_lift" if max_lift < .05 else "slip_or_drop")}
    if record:
        result["frames"] = frames
    return result


def stats(trials: list[dict]) -> dict:
    n = len(trials)
    k = sum(t["success"] for t in trials)
    # Wilson 95% binomial interval, not a claimed population guarantee.
    z = 1.959963984540054
    p = k / n
    den = 1 + z*z/n
    centre = (p + z*z/(2*n)) / den
    radius = z * math.sqrt(p*(1-p)/n + z*z/(4*n*n)) / den
    grouped = collections.defaultdict(list)
    for t in trials:
        grouped[t["seed"]].append(float(t["success"]))
    seed_means = np.array([np.mean(grouped[s]) for s in sorted(grouped)])
    rng = np.random.default_rng(20261020)
    bootstrap = np.mean(seed_means[rng.integers(0, len(seed_means), (2000, len(seed_means)))], axis=1)
    return {"trials": n, "successes": k, "rate": p, "wilson95": [centre-radius, centre+radius],
            "seedBlocks": len(seed_means), "seedBlockBootstrap95": np.quantile(bootstrap, [.025, .975]).tolist(),
            "meanPeakNormalN": float(np.mean([t["peakNormalN"] for t in trials])),
            "meanAbsWorkJ": float(np.mean([t["actuatorAbsWorkJ"] for t in trials]))}


def write_json(path: Path, data: dict | list) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def meta() -> dict:
    return {"schemaVersion": 1, "experimentVersion": VERSION, "engine": "MuJoCo", "engineVersion": mujoco.__version__,
            "numpyVersion": np.__version__, "pythonVersion": platform.python_version(),
            "sourceSha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), "dt": DT,
            "durationS": DURATION, "units": "m, kg, s, N", "shapes": SHAPES,
            "forceSamplingHz": 100, "trajectorySamplingHz": 50,
            "task": {"liftStartS": 1.35, "liftCommandM": .125, "holdWindowS": [3.1, 3.8],
                     "success": "object centre z >= 0.105 m throughout hold window and final |x| < 0.06 m"},
            "assumptions": ["Rigid pads and objects; soft contact approximation, Coulomb friction.",
                            "Ideal position/force-limited servos, no motor thermal model or tactile hardware.",
                            "No object weld, equality constraint, scripted object trajectory or grasp-success formula.",
                            "2D replay is an x-z projection of recorded 3D rigid-body dynamics.",
                            "Offline simulator experiments, not real hardware or sim-to-real validation."],
            "sources": [{"title": "MuJoCo Python bindings", "url": "https://mujoco.readthedocs.io/en/stable/python.html"},
                        {"title": "MuJoCo XML / actuator and contact definitions", "url": "https://mujoco.readthedocs.io/en/stable/XMLreference.html"}]}


def grasp_experiment(seeds: int = 12) -> None:
    all_trials = []
    for shape in SHAPES:
        for method in ("fixed_gap", "geometry", "force_feedback"):
            for seed in range(100, 100 + seeds):
                all_trials.append(run(condition(seed, shape, "grasp"), method, force=3.0, record=True))
    summary = [{"shape": sh, "method": method, **stats([t for t in all_trials if t["shape"] == sh and t["method"] == method])}
               for sh in SHAPES for method in ("fixed_gap", "geometry", "force_feedback")]
    data = {**meta(), "kind": "grasp", "seedRange": [100, 100+seeds-1], "summary": summary, "trials": all_trials}
    write_json(OUT / "grasp" / "results.json", data)
    write_json(OUT / "grasp" / "trials.json", [{k:v for k,v in t.items() if k != "frames"} for t in all_trials])
    (OUT / "grasp" / "model.xml").write_text(make_xml(condition(100, "cube", "nominal")), encoding="utf-8")
    print("GRASP", json.dumps(summary))


def randomization_experiment(train_seeds: int = 4, heldout_seeds: int = 10) -> None:
    candidates = [{"forceTargetN": force, "liftTimeS": duration} for force in (1.2, 2.6, 4.5) for duration in (.75, 1.2)]
    search, policies = [], []
    training_trials = []
    for domain in ("nominal", "physics", "full"):
        scored = []
        for candidate in candidates:
            trials = [run(condition(300 + seed, shape, domain), "force_feedback", candidate["forceTargetN"], candidate["liftTimeS"])
                      for seed in range(train_seeds) for shape in SHAPES]
            for tr in trials:
                tr["trainingDomain"] = domain
                training_trials.append(tr)
            st = stats(trials)
            row = {"domain": domain, "candidate": candidate, **st}
            search.append(row)
            # Explicit lexicographic search objective: success first, then lower force, then faster lift.
            scored.append((st["successes"], -candidate["forceTargetN"], -candidate["liftTimeS"], candidate))
        best = max(scored, key=lambda x: x[:3])[3]
        policies.append({"domain": domain, **best})
    trials = []
    for policy in policies:
        for shape in SHAPES:
            for seed in range(800, 800 + heldout_seeds):
                t = run(condition(seed, shape, "heldout"), "force_feedback", policy["forceTargetN"], policy["liftTimeS"], record=True)
                t["domain"] = policy["domain"]
                trials.append(t)
    summaries = [{"domain": p["domain"], **stats([t for t in trials if t["domain"] == p["domain"]])} for p in policies]
    paired = []
    nominal = {(t["shape"], t["seed"]): t for t in trials if t["domain"] == "nominal"}
    for domain in ("physics", "full"):
        differences = collections.defaultdict(list)
        wins, losses = 0, 0
        for t in trials:
            if t["domain"] != domain:
                continue
            delta = int(t["success"]) - int(nominal[t["shape"], t["seed"]]["success"])
            differences[t["seed"]].append(delta)
            wins += delta > 0
            losses += delta < 0
        block_values = np.array([np.mean(differences[s]) for s in sorted(differences)])
        rng = np.random.default_rng(20261020)
        boot = np.mean(block_values[rng.integers(0, len(block_values), (2000, len(block_values)))], axis=1)
        paired.append({"domain": domain, "reference": "nominal", "meanSuccessDifference": float(np.mean(block_values)),
                       "seedBlockBootstrap95": np.quantile(boot, [.025, .975]).tolist(),
                       "pairedWins": wins, "pairedLosses": losses, "seedBlocks": len(block_values)})
    data = {**meta(), "kind": "randomization", "selection": "finite grid search; not reinforcement learning or neural-network training",
            "objective": "Maximize training successes; ties choose lower force target, then faster lift.",
            "trainingSeedRange": [300, 300+train_seeds-1], "heldoutSeedRange": [800, 800+heldout_seeds-1],
            "domains": {"nominal": "fixed mass 0.10 kg, friction 0.75, centred, zero delay/noise",
                        "physics": "mass 0.07–0.24 kg, friction 0.16–0.88, x ±9 mm, yaw ±0.20 rad",
                        "full": "same physics + force feedback delay 20–100 ms and incremental jaw-position noise",
                        "heldout": "mass 0.10–0.23 kg, friction 0.18–0.65, x ±8 mm, yaw ±0.18 rad, delay 25–105 ms"},
            "candidates": candidates, "search": search, "policies": policies, "summary": summaries,
            "pairedComparisons": paired, "trials": trials}
    write_json(OUT / "randomization" / "results.json", data)
    write_json(OUT / "randomization" / "training-trials.json", training_trials)
    write_json(OUT / "randomization" / "trials.json", [{k:v for k,v in t.items() if k != "frames"} for t in trials])
    print("RANDOMIZATION", json.dumps({"policies": policies, "summary": summaries}))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", choices=("grasp", "randomization", "all"), default="all")
    parser.add_argument("--smoke", action="store_true", help="Small diagnostic batch; not the website evidence batch.")
    args = parser.parse_args()
    if args.smoke:
        print(json.dumps(run(condition(100, "cube", "nominal"), "force_feedback", 3.0, record=False)))
        sys.exit(0)
    if args.project in ("grasp", "all"):
        grasp_experiment()
    if args.project in ("randomization", "all"):
        randomization_experiment()
