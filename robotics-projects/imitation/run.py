"""Train official LeRobot ACT + MLP BC, evaluate closed-loop held-out 2D reach.

This is a low-dimensional kinematic teaching task, not vision, MuJoCo or hardware.
The expert is used only to create demonstrations, never as the evaluated policy.
"""
from __future__ import annotations

import argparse
import copy
import hashlib
import importlib.metadata
import json
import platform
from pathlib import Path
import time
import numpy as np
import torch
from torch import nn
from packaging.requirements import Requirement
from packaging.version import Version
from lerobot.configs.types import FeatureType, PolicyFeature
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
OUT = ROOT / "public/robotics-lab/imitation"
DT, STEPS, CHUNK, EXECUTE, SEED = .10, 60, 8, 4, 73


def task(seed):
    rng = np.random.default_rng(seed)
    while True:
        start, goal = rng.uniform(-.8, .8, (2, 2))
        if np.linalg.norm(start-goal) > .35:
            return start.astype(np.float32), goal.astype(np.float32)


def expert(p, goal):
    # Demonstration generator only. No call from rollout().
    return np.clip(2.0 * (goal-p), -.5, .5).astype(np.float32)


def demos(seeds):
    result = []
    for s in seeds:
        p, goal = task(s); states, actions = [], []
        for _ in range(STEPS):
            a = expert(p, goal)
            states.append(p.copy()); actions.append(a.copy())
            p = p + DT * a
        result.append({"id": s, "states": np.asarray(states), "goal": goal, "actions": np.asarray(actions)})
    return result


def samples(episodes):
    states, goals, chunks, masks = [], [], [], []
    for e in episodes:
        for k in range(STEPS):
            end = min(k+CHUNK, STEPS)
            a = np.zeros((CHUNK, 2), np.float32); a[:end-k] = e["actions"][k:end]
            pad = np.ones(CHUNK, dtype=bool); pad[:end-k] = False
            states.append(e["states"][k]); goals.append(e["goal"]); chunks.append(a); masks.append(pad)
    return {"observation.state": torch.tensor(np.asarray(states)), "observation.environment_state": torch.tensor(np.asarray(goals)), "action": torch.tensor(np.asarray(chunks)), "action_is_pad": torch.tensor(np.asarray(masks))}


def indexed(data, idx):
    return {k: v[idx] for k, v in data.items()}


def make_config():
    return ACTConfig(input_features={"observation.state": PolicyFeature(type=FeatureType.STATE, shape=(2,)), "observation.environment_state": PolicyFeature(type=FeatureType.ENV, shape=(2,))}, output_features={"action": PolicyFeature(type=FeatureType.ACTION, shape=(2,))}, device="cpu", push_to_hub=False, chunk_size=CHUNK, n_action_steps=EXECUTE, dim_model=64, n_heads=4, dim_feedforward=128, n_encoder_layers=2, n_decoder_layers=1, use_vae=True, latent_dim=8, n_vae_encoder_layers=1, dropout=0., kl_weight=.01, pretrained_backbone_weights=None)


class MLP(nn.Module):
    def __init__(self):
        super().__init__(); self.net = nn.Sequential(nn.Linear(4, 64), nn.Tanh(), nn.Linear(64, 64), nn.Tanh(), nn.Linear(64, 2))
    def forward(self, state, goal):
        return self.net(torch.cat([state, goal], -1))


@torch.no_grad()
def validation(policy, data):
    policy.eval()
    # Evaluation latent is zero, as official ACT inference specifies.
    errors = []
    for start in range(0, len(data["action"]), 256):
        batch = indexed(data, slice(start, start+256))
        pred = policy.predict_action_chunk(batch)
        mask = (~batch["action_is_pad"]).unsqueeze(-1)
        errors.append((float(((pred-batch["action"]).abs()*mask).sum()), int(mask.sum())*2))
    return sum(x[0] for x in errors) / sum(x[1] for x in errors)


@torch.no_grad()
def rollout(seed, policy, baseline, condition, mode):
    p, goal = task(seed); start = p.copy(); path, errors, actions = [], [], []
    if condition == "unseen-goals":
        # Reachable corners outside the training goal distribution; no retraining.
        goal = np.where(goal >= 0, 1.10, -1.10).astype(np.float32)
    policy.reset(); policy.eval(); baseline.eval()
    infer_calls = 0; inference_ms = []
    def count_forward(_module, _inputs, _outputs):
        nonlocal infer_calls
        infer_calls += 1
    hook = policy.model.register_forward_hook(count_forward) if mode == "act" else None
    for k in range(STEPS):
        if condition == "perturbed" and k == 15:
            p = p + np.array([.18, -.15], dtype=np.float32)
        obs = {"observation.state": torch.tensor(p[None]), "observation.environment_state": torch.tensor(goal[None])}
        if mode == "act":
            before = time.perf_counter(); a = policy.select_action(obs)[0].numpy(); inference_ms.append((time.perf_counter()-before)*1000)
        elif mode == "mlp":
            a = baseline(obs["observation.state"], obs["observation.environment_state"])[0].numpy()
        else:
            a = np.zeros(2, np.float32)
        # Only model output enters dynamics; the goal is not used by this update.
        a = np.clip(a, -.5, .5)
        p = np.clip(p + DT * a, -1.2, 1.2)
        path.append([float(p[0]), float(p[1])]); actions.append(a.tolist()); errors.append(float(np.linalg.norm(p-goal)))
    if hook is not None: hook.remove()
    return {"seed": seed, "mode": mode, "condition": condition, "start": start.tolist(), "goal": goal.tolist(), "path": path, "actions": actions, "errors": errors, "success": bool(max(errors[-5:]) < .06), "final_error": errors[-1], "min_error": min(errors), "inference_calls": infer_calls, "mean_step_compute_ms": float(np.mean(inference_ms)) if inference_ms else None}


def main():
    parser = argparse.ArgumentParser(); parser.add_argument("--steps", type=int, default=1000); args = parser.parse_args()
    torch.set_num_threads(2); torch.manual_seed(SEED); np.random.seed(SEED)
    torch.use_deterministic_algorithms(True)
    OUT.mkdir(parents=True, exist_ok=True)
    split = {"train": list(range(10000, 10180)), "validation": list(range(20000, 20030)), "test": list(range(30000, 30040))}
    train_episodes = demos(split["train"]); validation_episodes = demos(split["validation"])
    train, val = samples(train_episodes), samples(validation_episodes)
    policy = ACTPolicy(make_config()); baseline = MLP()
    optimizer = torch.optim.AdamW(policy.parameters(), lr=8e-4, weight_decay=1e-4)
    base_optimizer = torch.optim.AdamW(baseline.parameters(), lr=1e-3)
    generator = torch.Generator().manual_seed(SEED)
    history, best_val, best_state = [], float("inf"), None
    best_base_val, best_base_state = float("inf"), None
    before = time.perf_counter()
    for step in range(args.steps):
        idx = torch.randint(len(train["action"]), (64,), generator=generator); batch = indexed(train, idx)
        policy.train(); loss, detail = policy(batch)
        optimizer.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(policy.parameters(), 1.); optimizer.step()
        baseline.train(); base_pred = baseline(batch["observation.state"], batch["observation.environment_state"])
        base_loss = (base_pred-batch["action"][:, 0]).square().mean()
        base_optimizer.zero_grad(); base_loss.backward(); base_optimizer.step()
        if step % 50 == 0 or step == args.steps-1:
            v = validation(policy, val)
            baseline.eval()
            with torch.no_grad():
                bv = float((baseline(val["observation.state"], val["observation.environment_state"])-val["action"][:, 0]).abs().mean())
            history.append({"step": step+1, "train_loss": float(loss.detach()), "train_l1": float(detail["l1_loss"]), "train_kl": float(detail.get("kld_loss", 0)), "validation_l1": v, "mlp_validation_l1": bv})
            if v < best_val:
                best_val, best_state = v, copy.deepcopy(policy.state_dict())
            if bv < best_base_val:
                best_base_val, best_base_state = bv, copy.deepcopy(baseline.state_dict())
            print(json.dumps(history[-1]), flush=True)
    elapsed = time.perf_counter()-before
    if best_state is None: raise RuntimeError("No model selected")
    policy.load_state_dict(best_state)
    if best_base_state is None: raise RuntimeError("No baseline selected")
    baseline.load_state_dict(best_base_state)
    checkpoint = HERE / "act_checkpoint.pt"; baseline_checkpoint = HERE / "mlp_checkpoint.pt"
    torch.save({"state_dict": policy.state_dict(), "seed": SEED, "architecture": {"chunk_size": CHUNK, "n_action_steps": EXECUTE, "dim_model":64}, "selected_validation_l1":best_val}, checkpoint)
    torch.save({"state_dict": baseline.state_dict(), "seed": SEED}, baseline_checkpoint)
    # Round-trip the saved checkpoint before all held-out evaluation.
    restored = ACTPolicy(make_config()); restored.load_state_dict(torch.load(checkpoint, map_location="cpu", weights_only=True)["state_dict"])
    cases, summaries = [], []
    for condition in ["nominal", "perturbed", "unseen-goals"]:
        for mode in ["act", "mlp", "zero"]:
            runs = [rollout(s, restored, baseline, condition, mode) for s in split["test"]]
            cases.extend(runs)
            count = sum(r["success"] for r in runs); n = len(runs); phat = count/n
            z = 1.96; den = 1+z*z/n; center=(phat+z*z/(2*n))/den; half=z*np.sqrt(phat*(1-phat)/n+z*z/(4*n*n))/den
            summaries.append({"condition": condition, "mode": mode, "episodes":n, "successes":count, "success_rate":phat, "success_wilson95":[max(0.,center-half),min(1.,center+half)], "mean_final_error":float(np.mean([r["final_error"] for r in runs])), "worst_final_error":max(r["final_error"] for r in runs)})
    # Save demonstration data + membership separately for reproducibility.
    np.savez_compressed(HERE / "demonstrations.npz", train_states=np.stack([e["states"] for e in train_episodes]), train_actions=np.stack([e["actions"] for e in train_episodes]), train_goals=np.stack([e["goal"] for e in train_episodes]), validation_states=np.stack([e["states"] for e in validation_episodes]), validation_actions=np.stack([e["actions"] for e in validation_episodes]), validation_goals=np.stack([e["goal"] for e in validation_episodes]))
    dependency_check = []
    for text in importlib.metadata.requires("lerobot") or []:
        requirement = Requirement(text)
        if requirement.name in {"torch", "torchvision", "numpy", "packaging"}:
            actual = importlib.metadata.version(requirement.name)
            dependency_check.append({"package":requirement.name,"actual":actual,"declared":str(requirement.specifier),"within_declared_range":Version(actual) in requirement.specifier})
    result = {"schema_version":1,"project":"imitation","evidence":"official LeRobot ACTPolicy actually trained on low-dimensional synthetic demonstrations; no cameras or hardware","implementation":"lerobot.policies.act.modeling_act.ACTPolicy","versions":{"lerobot":importlib.metadata.version("lerobot"),"torch":torch.__version__,"torchvision":importlib.metadata.version("torchvision"),"numpy":np.__version__,"packaging":importlib.metadata.version("packaging"),"python":platform.python_version()},"environment":{"dependency_check":dependency_check,"all_within_declared_ranges":all(x["within_declared_range"] for x in dependency_check),"note":"This is the locally tested experimental combination, not a claim of upstream support. Existing PyTorch packages were reused read-only; no source patch or compatibility check bypass is used by this script."},"seed":SEED,"config":{"training_steps":args.steps,"batch_size":64,"chunk_size":CHUNK,"execution_steps":EXECUTE,"dt":DT,"rollout_steps":STEPS,"dim_model":64,"use_vae":True,"kl_weight":.01,"success_radius":.06,"success_final_steps":5,"best_validation_l1":best_val,"training_seconds":elapsed,"state_dimensions":2,"environment_dimensions":2,"action_dimensions":2},"split_episode_ids":split,"training_history":history,"summary":summaries,"cases":cases,"checkpoint":{"file":"robotics-projects/imitation/act_checkpoint.pt","sha256":hashlib.sha256(checkpoint.read_bytes()).hexdigest(),"bytes":checkpoint.stat().st_size,"round_trip_verified":True},"limitations":["Kinematic 2D point reach, not a physical arm, visual imitation, manipulation or real robot.","Synthetic expert controls demonstrations only. Evaluation actions come exclusively from trained policy outputs or explicit baselines.","Target is an observed environment-state input; 40 held-out episodes are disjoint from training and validation.","A small easy task can yield high success and does not establish dexterous manipulation competence."]}
    (OUT / "results.json").write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":"), allow_nan=False), encoding="utf-8")
    (HERE / "config.json").write_text(json.dumps(result["config"], indent=2), encoding="utf-8")
    print(json.dumps({"summary":summaries,"training_seconds":elapsed,"checkpoint":result["checkpoint"]}, indent=2),flush=True)


if __name__ == "__main__":
    main()
