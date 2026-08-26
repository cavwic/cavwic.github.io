---
title: "Agent autonomy must come after permission design"
description: "The central question for an enterprise agent is not how many tools it can call, but whether each action is authorized, observable, reversible, and transferable to a person."
locale: en
kind: article
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: false
tags: [Agent, permissions, security]
sourceIds: [ref-05, ref-06, ref-14, ref-41, ref-43, ref-44, job-15, job-20]
alternatePath: /library/agent-permission-before-autonomy
---

## Position

"Let the agent handle it" is not a product capability. It is a set of permission commitments. Reading a customer record, sending an email, changing an order, and deleting data carry different risks. They cannot sit behind one vague claim of tool-calling support.

Each action needs its own authorization model: who may initiate it, what the model may decide, what the rules validate, who approves it, which logs remain afterward, and how a failed action is compensated. If any part is undefined, automatic write access should remain closed.

The usual objection is that human approval weakens the value of automation. That holds for low-risk, frequent, stable tasks. It does not hold for external commitments, money, deletion, sensitive data, or irreversible actions. A sensible progression starts with read-only recommendations, moves to controlled writes, and considers autonomous execution only inside a narrow, tested boundary.

In implementation, the tool inventory belongs beside the permission matrix. The demo script must also cover timeouts, duplicate submissions, partial success, and unknown return states. An agent looks professional when it knows when to stop, not when it performs the most actions.
