---
title: "Enterprise AI selection: answers, extraction and actions need different contracts"
description: "Separate three application types by output responsibility before choosing data controls, validation and escalation."
locale: en
kind: article
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-10-22
reviewedAt: 2026-10-22
featured: false
tags: [Enterprise AI, Selection, RAG, Data governance]
sourceIds: [ref-120, ref-121]
alternatePath: /library/enterprise-ai-evidence-boundary
---

## Ask what happens when the output is wrong

“Use AI to process our documents” can mean three different tasks. Knowledge assistance finds a supported answer. Extraction turns source material into validated fields. Business execution changes a system's state. They may share a model, but they need different acceptance contracts.

For answers, test evidence, version selection and abstention. For extraction, test source locations, units, missing values and correction history. For actions, test authorization, approval, duplicates and destination receipts.

## Three counterexamples

**Similar wording is not applicable evidence.** Old policies, drafts and current versions can all match the same keywords. Preserve versions and permissions in preparation and retrieval; similarity is neither authorization nor validity. [Microsoft RAG documentation](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

**Valid JSON is not a correct field.** A well-formatted date might be the signature date rather than the effective date. Retain field definitions, source locations and a review path. Recalculate derived values in code.

**“Done” is not a destination receipt.** Store a queryable record ID and final state. If the target times out, reconcile before deciding whether to retry.

## A more useful selection checklist

| Question | Evidence to request |
| --- | --- |
| How is access controlled and updated? | Role-isolation samples, update and deletion propagation records |
| How is output checked? | Field contracts, source locations, business rules and failure cases |
| Can the model be replaced? | A fixed test set and comparable versioned results |
| What happens when an interface fails? | Timeout, duplicate, partial-success and escalation trials |
| What does a task cost? | Calls, retries, parsing, storage and human corrections |

## My recommendation

Start with one task and one authorized data domain. Run tests business users can repeat before expanding. An agent feature or workflow canvas does not establish correct authorization or recovery. Malicious source instructions remain a risk; prompt wording cannot replace application-enforced permissions. [OWASP reference](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)

<!-- AI_WORKBENCH_PAUSED: Use the [AI delivery workbench](/en/tools/ai-delivery-workbench) to draft the task boundary. -->
Read the [enterprise workflow solution](/en/library/enterprise-ai-workflow-delivery) for the full method. This article does not rank platforms without comparative testing.
