# Ticket timeout: state transitions and recovery decisions

A fictional pre-execution design, not an incident log or a connection to a ticket system.

## Event and side effect

Use a stable source-message event ID across retries. The approved action creates one test ticket. Retain the destination ID, final state and execution correlation key. Confirm destination idempotency support, retention, query consistency and whether changed content needs renewed approval.

| State | Evidence | Next action |
| --- | --- | --- |
| Awaiting approval | Draft and input summary | Approve before execution; rejection ends without a write |
| Ready | Valid approval and stable event ID | Check for an existing result before creating anything |
| Confirmed success | Destination ID and receipt | Retain the result and return it on replay |
| Confirmed failure without a write | Destination rejection or evidence of no creation | Correct the issue or apply a bounded eligible retry |
| Unknown outcome | Timeout without a reliable receipt | Reconcile, rather than treating it as unexecuted |
| Partial completion | Receipts for completed sub-items | Preserve them and recover only the remainder |

## Timeout recovery

Query using the stable event ID or supported destination fields. If an existing record matches the approved request, retain its receipt. Retry only after confirming that creation did not occur and the error is eligible, within business-approved attempt and time limits. Escalate unresolved outcomes. A temporarily empty query result is not proof of no write.

## Planned drill

Lose the response after a successful write and replay the event. Expect one final ticket with a traceable approval and receipt. Also test rejected approval, persistent outage, partial completion and changed content after approval. Record the environment, actual outcome and recovery decision. Expected behavior is not a passed test.
