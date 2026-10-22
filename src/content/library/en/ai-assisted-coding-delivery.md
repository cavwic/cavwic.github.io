---
title: "AI-assisted coding: from a quick prototype to a maintainable application"
description: "Use task contracts, vertical slices, test evidence and human review to distinguish a demo from a maintainable release."
locale: en
kind: whitepaper
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-10-22
reviewedAt: 2026-10-22
featured: true
tags: [Vibe coding, AI-assisted development, Testing, Delivery]
sourceIds: [ref-119, ref-121]
alternatePath: /library/ai-assisted-coding-delivery
---

## Define what finished means

Here, vibe coding means using natural language and rapid feedback to explore an application, not opting out of engineering responsibility. An opening page, one working journey, a maintainable application and a production release are different milestones. This is a design method, not a customer case or a claim that an AI can own security and release decisions.

Specify the user, one core action, the permitted change boundary, protected data and an observable acceptance result. “Import a redacted CSV, flag invalid rows and export a correction list without modifying the original” is enough to begin a small slice.

## Build vertical slices

Do not generate every screen before implementing behavior. Complete a small path: input → validation → processing → display → export. Then handle failures, empty states, repeated actions and narrow screens. Every slice needs a runnable entry point and a repeatable check.

| Stage | Evidence to retain | What it does not prove |
| --- | --- | --- |
| Scope and discovery | Existing entry points, dependencies, data boundaries | Every user need is covered |
| First implementation | One real end-to-end action | The application is complete |
| Verification | Commands, results, screenshots or interaction records | Tests that were not run would pass |
| Review | Diff, risks and remaining limits | No undiscovered defects exist |
| Release preparation | Build artifact, rollback point, release owner | Permission to push or deploy |

## Give the assistant a task contract

Include the working directory, allowed modules, input/output contract, acceptance commands and actions requiring separate approval. Secrets, production databases and personal document folders are not free context.

Read existing code and tests before changing them. Use the repository's patterns. Storage formats, authentication, shared components and migrations justify broader contract tests and recovery planning. A wording change does not justify a framework rewrite.

## Test beyond the ideal demonstration

An import tool should cover an empty file, invalid encoding, missing columns, duplicates, large input, cancellation and reopening an export. Model-connected applications also need timeouts, rate limits, malformed structured output, missing citations and cancellation.

Use actual command results alongside human review. GitHub branch protection can require reviews and status checks, but these controls exist only once configured in the repository. A written recommendation is not an enabled safeguard. [Official documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

## Treat generated code as a proposed change

Code, pages, dependency instructions and tool output may contain mistakes or untrusted instructions. External text must not expand permission to read secrets, disable checks, install unknown packages or push remotely. Prompt-injection concerns also apply to material read by development agents. [OWASP reference](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)

Review behavior changes, missing failure paths, unauthorized reads or writes, unnecessary dependencies and preservation of user data, not just code style.

## Resume from evidence

Keep a short handoff: completed tasks, changed files, last successful commands, failures, running services, unverified behavior and the next step. On recovery, inspect the workspace, services and artifacts before rerunning anything.

Temporary workspaces can reduce risk, but starting over must not overwrite the user's data. Revert only the identified changes within the authorized scope, not the whole checkout.

## Companion workflow

Choose “AI-assisted coding” in the [AI delivery workbench](/en/tools/ai-delivery-workbench), define scope, acceptance and recovery, then export a task brief. The [AI coding delivery Skill](/en/skills/ai-coding-delivery) covers repository discovery, implementation, verification and handoff. It is model-neutral and is not installed automatically.
