---
title: "Enterprise AI presales and POC: from chat demo to accepted system"
description: "A presales method for RAG, agents, and system integration that covers requirements, data, permissions, evaluation, cost, safeguards, human takeover, and acceptance."
locale: en
kind: whitepaper
industry: ai
evidence: [公开资料研究, 个人实践, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: true
tags: [RAG, Agent, POC, enterprise AI, evaluation]
sourceIds: [ref-01, ref-02, ref-04, ref-07, ref-08, ref-09, ref-10, ref-12, ref-14, ref-41, ref-42, ref-43, ref-44, job-10, job-12, job-15, job-20]
alternatePath: /library/enterprise-ai-presales-poc
---

## Start with the conclusion

An enterprise AI POC should not prove that a model can answer. It should prove that a business chain deserves further investment under real constraints. A chat window can display model capability, but it cannot settle five project-defining questions: who owns the data, who may see it, how errors are detected, who takes over after failure, and how the result will be accepted.

The presales solution should therefore start with tasks, evidence, and responsibility, not a model shortlist.

## Qualification: which problem deserves a POC

I compress the request into a one-page qualification card that answers at least five questions:

1. **Business task:** What action is the user trying to complete, and where does the current process fail?
2. **Input and output:** Are inputs documents, tables, images, speech, or system events? Is the output a recommendation, structured data, or an executable action?
3. **Cost of error:** What follows from a wrong answer, omission, unauthorized access, or incorrect action?
4. **Evidence conditions:** Are historical samples, confirmed answers, and failure samples available?
5. **System boundary:** Which systems are read-only, which allow writes, and who can approve a high-risk action?

When these answers remain "to be decided later," the POC usually becomes an unbounded demo. A project can still move before model selection if the task and acceptance object are clear.

## RAG: evaluate retrieval before answers

RAG output depends on parsing, chunking, indexing, recall, reranking, context assembly, and generation. Looking only at the final answer mixes missed retrieval, stale versions, and unsupported generation into one fault.

The minimum useful evaluation has three layers:

| Layer | Question | Representative measures |
| --- | --- | --- |
| Data and parsing | Did the source enter the index intact? | Parse success, table and page retention, incremental-update time |
| Retrieval | Was the evidence found and ranked where it could be used? | Recall@K, Precision@K, change after reranking |
| Generation | Does the answer stay with the evidence and cover the question? | Groundedness, citation coverage, key-fact accuracy, correct refusal |

A golden test set cannot contain only easy questions. It should include abbreviations, typos, cross-document questions, version conflicts, permission isolation, no-answer cases, and documents containing prompt injection. That load is closer to what the system will meet after launch.

## Agents: every action needs permission and fallback

The risk is not whether an agent can call a tool. The risk is whether the resulting state can be explained and reversed. Every tool needs read and write permissions, parameter validation, idempotency rules, timeout, retry, approval points, audit logs, and a compensation action.

For high-risk work, I prefer model proposal, rule validation, human approval, then system execution. It is less dramatic than a fully autonomous demo and much easier for security, compliance, and business owners to review.

Human takeover is mandatory when:

- a decisive field is missing and cannot be recovered from an authorized source;
- sources conflict on an important fact;
- a tool reports partial success or an unknown state;
- the action sends data outside, deletes, pays, approves, or creates a customer commitment;
- confidence, citation coverage, or a rules check falls below its threshold.

## Architecture is not a model wiring diagram

A deliverable architecture has at least six layers: channels and identity, application orchestration, models and routing, knowledge and data, tools and business systems, and evaluation and operations. Each layer names its owner, interfaces, deployment location, data range, and failure effect.

Models can be replaced. Identity, permissions, audit, and business interfaces usually cannot be assembled at the last minute. Postponing them until after the POC can send a promising demo back to zero at the IT review.

## Cost belongs to the task

A token price does not answer the project-budget question. Cost per task combines model calls, vector retrieval, document parsing, storage, reranking, tool calls, human review, and failed retries, then applies concurrency, peaks, and retention.

Latency also needs to be separated. Slow retrieval, a slow external interface, and slow generation require different fixes. One total number cannot guide delivery.

## An acceptance sheet both sides can sign

Business, technical, and project owners should confirm one acceptance sheet before the POC starts:

| Item | Example definition |
| --- | --- |
| Sample scope | Named business domain, document versions, permission roles, and exception samples |
| Quality | Key-fact accuracy, citation coverage, correct refusal |
| Performance | P50 and P95 latency, concurrency, timeout rate |
| Security | Unauthorized access, prompt injection, sensitive-data exposure, incorrect tool calls |
| Operations | Traceable logs, rollback, knowledge updates, and exception takeover |
| Exit conditions | Failures that stop the POC and issues allowed into the next phase |

The list can be short, but both parties must be able to run it again. A measure that only the solution team can interpret is not an acceptance criterion.

## Presales deliverables

A complete POC pack is more than a presentation. It includes the qualification card, scope statement, architecture, data inventory, interface inventory, test set, metric definitions, risk register, success and failure scripts, cost estimate, implementation plan, and acceptance record.

This approach can make the opening phase feel slower. It exposes expensive problems while they are still cheap to resolve. Enterprise AI projects fail less often from weak model capability than from everyone assuming someone else owns the data, permissions, exceptions, and acceptance.
