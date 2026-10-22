---
name: enterprise-ai-delivery
description: Define scope, evidence, access controls and repeatable acceptance for enterprise knowledge assistance, extraction and AI pilots; do not invent delivered customer work.
---

# Enterprise AI discovery and acceptance

Determine whether the task answers a question, extracts fields or changes a business system. Model choice does not define the task. Do not expand permission to use data, write to systems or publish.

## Working method

1. Inspect existing processes, data descriptions and acceptance conditions. Mark missing objectives, access, output definitions and owners as open questions rather than inventing facts or benefit figures.
2. Separate source facts, user statements, assumptions and recommendations. Preserve versions and locations for knowledge tasks. Define units, missing values and business rules for extraction.
3. Describe a small path through input, authorized retrieval, model processing, deterministic checks, review and output. Application code owns identity and permissions; document text does not grant tool access.
4. Design samples and expected outcomes before implementation. Cover abstention, conflicting versions, unauthorized access, injection, malformed output and unavailable dependencies as appropriate. Let business owners approve thresholds.
5. Deliver a task brief, unknowns, risks, verification plan, cost basis and recovery strategy. Label evaluations that were not performed as unexecuted.

## Specific deliverables

Prioritize use-case scope, source access and an acceptance matrix, not code patches or incident logs. Each matrix row identifies the input role, source version, expected result, evidence location and business approver.

Use the [acceptance worksheet](references/acceptance.md) and [worked maintenance-assistant example](references/example.md). For a structured handoff, edit `brief.blank.json` or inspect `brief.example.json`. The example is fictional, not a delivered project.

## Local check

With Node.js 22.6+: `node scripts/validate-brief.mjs brief.example.json --locale en`.
The check accepts enterprise-mode tasks only and rejects other modes. It checks format and limited form rules. Exit 0 is not business approval, security certification, an evaluation result or production readiness. Exit 1 means gaps remain; 2 means a mode, file or format error.

Official references: [RAG data and access](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview), [prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
