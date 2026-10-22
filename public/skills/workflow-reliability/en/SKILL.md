---
name: workflow-reliability
description: Design approval, idempotency, timeout reconciliation and recovery for AI or business workflows, and review failure paths without enabling production automation by default.
---

# Workflow reliability

Start with the business event and destination state, not a node screenshot. Preserve the chosen platform; do not replace a fixed process with autonomous agents without a reason.

## Working method

1. Record input, output, read/write effects, owner and failure states for each step. Identify the real business key; a fresh UUID on every attempt does not establish idempotency.
2. Give writes and sending explicit approval, least privilege, destination receipts and preconditions. A checked design field is not actual approval.
3. Distinguish confirmed failure, confirmed success, unknown outcomes and partial completion. A timeout can follow a successful write. Reconcile before retrying; escalate unresolved states.
4. Bound retry types, attempts and elapsed time. Do not loop on authorization failures. Define compensation by business reversibility rather than assuming deletion restores everything.
5. Plan isolated tests for duplicate events, lost responses, interruption around approval and partial success. Provide a recovery record and untested items, not invented execution logs.

## Specific deliverables

Deliver a side-effect inventory, state transitions, write contracts and recovery drills. For unknown outcomes, identify the query, evidence, responsible person and stop condition. Do not prescribe retries for every failure.

Use the [recovery worksheet](references/recovery.md) and [worked ticket-timeout example](references/example.md). `brief.example.json` is a ticket-design example; `brief.blank.json` starts a new task. Workbench JSON is not an executable import for n8n, Dify or another runtime.

With Node.js 22.6+: `node scripts/validate-brief.mjs brief.example.json --locale en`. Accepts workflow-mode tasks only. Exit 0 means limited form checks passed; 1 means gaps; 2 means a mode, file or format error. The check makes no requests and cannot prove destination idempotency support.

Reference: [n8n error handling](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully).
