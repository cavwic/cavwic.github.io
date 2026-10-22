---
title: "A green workflow is not proof of recoverability"
description: "Use ticket creation to distinguish retry, idempotency, reconciliation and compensation before enabling business writes."
locale: en
kind: article
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-10-22
reviewedAt: 2026-10-22
featured: false
tags: [Workflows, Idempotency, Recovery, Agents]
sourceIds: [ref-117, ref-118]
alternatePath: /library/workflow-retry-is-not-recovery
---

## The timeout after success

Imagine a workflow classifies an email and creates a ticket. The destination saves it, but the response is lost. Retrying may create another ticket. This is a design example, not a reported incident.

The question is not whether to retry three times. It is whether the business outcome is known. Retries address transient failures; idempotency and reconciliation address duplicate side effects.

## Give the event a stable identity

Use a source event ID or a business-approved composite key, not a new identity on every retry. If the destination supports idempotency keys, check their scope, retention and behavior when parameters differ. Otherwise combine durable execution records with destination queries. An in-memory “already executed” flag is not a reliability guarantee.

| State | Next action |
| --- | --- |
| Not sent | Validate, then execute |
| Confirmed rejection without a write | Correct the issue or apply a bounded retry |
| Timed out, outcome unknown | Query the destination; escalate if unresolved |
| Completed | Return the existing receipt |
| Partially completed | Reconcile sub-items and resume only the remainder |

## An error branch needs business context

An execution log identifies the failed node, not necessarily the business outcome. n8n can centralize execution failures through an error workflow. Include a redacted task ID, failed step, state and escalation link rather than forwarding raw documents or credentials. [Official error-handling documentation](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully)

Compensation is not simply deleting the last record. Another system may already have read, approved or sent it. Business owners must define which transitions are reversible.

## Test recovery explicitly

In a test environment, replay the same event, simulate a lost response, and interrupt before and after approval. Inspect destination counts, receipts and the audit chain. Bound attempts and elapsed time. Keep failure and recovery evidence instead of presenting a successful rerun as if nothing failed.

My conclusion: a success-only demonstration does not establish deliverability. Use the [workflow reliability Skill](/en/skills/workflow-reliability) to define the state contract. The [AI delivery workbench](/en/tools/ai-delivery-workbench) helps preserve the brief; it does not execute external writes.
