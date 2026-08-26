---
title: "When RAG performs badly, do not switch models first"
description: "Check parsing, chunking, retrieval, reranking, and generation separately before using a more expensive model to hide a broken evidence chain."
locale: en
kind: article
industry: ai
evidence: [公开资料研究, 个人实践, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: false
tags: [RAG, retrieval, evaluation]
sourceIds: [ref-02, ref-07, ref-08, ref-10]
alternatePath: /library/rag-evaluation-before-model-switch
---

## Position

Replacing the model is often the most expensive and least diagnostic response to a weak RAG answer. If the correct evidence never reaches the context, a stronger model still has to guess.

The investigation order should stay fixed. Was the source parsed correctly? Did chunks preserve headings, tables, and surrounding context? Did the right passage enter initial retrieval? Did reranking move it forward? Did the final prompt state the version and citation requirements clearly?

A useful test is to bypass generation and inspect the Top-K results. If a person cannot find the answer in the first results, the fault sits in the retrieval chain. If the evidence is first and the answer is still wrong, then inspect the prompt, conflicting context, and model. Each change now has a reason.

An end-to-end demo that "looks good" is a poor counterexample. Change an abbreviation, add a typo, or ask across two documents and the answer may collapse. The model did not suddenly become less capable. The test set failed to represent real questions.

Evaluation logs and index versions belong in the POC deliverables. One fluent answer cannot be reused as evidence. An evaluation that shows where the failure occurred can.
