---
title: "Vibe coding needs a change contract, not a longer prompt"
description: "Turn an open-ended app request into observable behavior, protected data, scope and acceptance checks."
locale: en
kind: article
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-10-22
reviewedAt: 2026-10-22
featured: false
tags: [Vibe coding, AI-assisted development, Acceptance, Code review]
sourceIds: [ref-119]
alternatePath: /library/vibe-coding-needs-change-contract
---

## A long prompt can still leave the boundary unclear

“Make a professional, beautiful, complete tool” describes preferences, not observable behavior. An assistant may produce many screens without knowing whether it may overwrite source files, access another system or claim completion.

I prefer a short change contract that evolves with feedback rather than an expanding list of adjectives.

## A contract that is ready to use

For a local CSV checker:

- User action: select a file, inspect invalid rows and export an error list.
- Data boundary: no uploads, no source-file changes, no assumption that a refresh preserves work.
- Scope: import, validation, results and related tests; no framework replacement.
- Acceptance: defined behavior for valid input, missing columns, empty files, duplicates and cancellation.
- Separate approval: dependency installation, migration, commits, pushes and deployment.

This is a task-design example, not a delivered customer case. Adjust the checks to the real risk.

## Evidence before completion

“Tests should pass” and “the layout is responsive” are not results. A handoff should include executed commands, exit status, inspected viewport sizes, unrun tests and known limitations. Report environment failures as blockers rather than converting unexecuted checks into passes.

Reviews and automated status checks can gate merging. GitHub provides branch-protection controls, but verify actual configuration and bypass permissions in the repository. [Official documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

## Make the next session resumable

Record the current entry point, completed work, last verified step, preserved user state and next action. Conversation length is not a task register. Recovery should not repeat installations or overwrite existing results.

<!-- AI_WORKBENCH_PAUSED: Draft the contract in the [AI delivery workbench](/en/tools/ai-delivery-workbench), paired with the [AI coding delivery Skill](/en/skills/ai-coding-delivery). -->
Use the [AI coding delivery Skill](/en/skills/ai-coding-delivery) to structure the contract. The [AI-assisted coding solution](/en/library/ai-assisted-coding-delivery) gives the full method. A written plan is not evidence that its tasks have run.
