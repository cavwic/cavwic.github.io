# State and recovery worksheet

For each side-effecting step, retain the event ID, business key, attempt count, approval record, request summary, destination record ID, final state and next owner. Keep secrets and unnecessary source text out of logs.

| Test | Expected observation |
| --- | --- |
| Replay an event | No duplicate destination record |
| Lose the response after success | Reconciliation returns the existing receipt |
| Reject approval | No write; an explicit terminal state |
| Complete only one of two items | No repeat of the completed item |
| Keep the dependency unavailable | Bounded retries followed by escalation |

Recovery record: failed step / side effects / verified evidence / allowed recovery / approver / actual result. Leave unsupported fields open.
