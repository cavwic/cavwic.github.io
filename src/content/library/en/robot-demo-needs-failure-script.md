---
title: "A robot demo without a failure script is not a solution"
description: "The success path shows an upper bound. Failure scripts expose site dependencies, recovery behavior, safety ownership, and the actual cost of delivery."
locale: en
kind: article
industry: robotics
evidence: [公开资料研究, 个人实践, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: true
tags: [robotics, demos, failure recovery]
sourceIds: [ref-23, ref-45, ref-46, job-23, job-27, job-30, job-31]
alternatePath: /library/robot-demo-needs-failure-script
---

## Position

A robot completing one task proves that the chain worked under those conditions. Site readiness depends on what happens when the object is misplaced, the route is blocked, the network drops packets, the grasp fails, or a person approaches.

I expect a demo to trigger at least four failure classes on purpose: perception failure, unreachable motion, external-system timeout, and a safety event. Each one should show the detection signal, stop or retry rule, human entry point, recovered state, and whether the logs can reconstruct what happened.

The usual objection is that the customer should see the effect first and discuss failure later. Recovery changes the architecture, cycle time, staffing, and price. It is not a final code patch. A presales demo that never touches failure is hiding delivery cost.

Success and failure scripts should use the same task state machine. Acceptance records should retain every failure rather than report only a success rate. A robot that stops predictably, explains why, and recovers is closer to a product than one that is occasionally impressive but cannot account for its own state.
