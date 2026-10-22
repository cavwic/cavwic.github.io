"""Re-run selected successes/failures and compare with saved physical trajectories."""
import json

from experiment import OUT, run

checked = 0
for kind in ("grasp", "randomization"):
    data = json.loads((OUT / kind / "results.json").read_text(encoding="utf-8"))
    for success in (False, True):
        saved = next(t for t in data["trials"] if t["success"] == success)
        actual = run(saved["condition"], saved["method"], saved["policy"]["forceTargetN"],
                     saved["policy"]["liftTimeS"], record=True)
        expected = {k: v for k, v in saved.items() if k != "domain"}
        assert actual == expected, f"Replay changed: {kind}, {saved['shape']}, seed={saved['seed']}"
        checked += 1
print(f"PASS: {checked} independently re-run success/failure trials match all saved metrics and frames exactly.")
