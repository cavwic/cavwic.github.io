---
title: "An AI POC is not a chat window"
description: "A page that answers questions proves that a model is connected. An enterprise POC must close the loop across tasks, permissions, evidence, exceptions, and acceptance."
locale: en
kind: article
industry: ai
evidence: [公开资料研究, 个人实践, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: true
tags: [AI, POC, acceptance]
sourceIds: [ref-02, ref-04, ref-41, ref-42, ref-43, job-10, job-12]
alternatePath: /library/ai-poc-not-chat-window
---

## Position

A chat window is an interaction pattern, not a business solution. It hides the difficult work behind an input box: identity, knowledge versions, system permissions, exception handling, and responsibility for the result.

I use four checks to decide whether a POC is credible. First, do the inputs come from the real business process rather than a few clean samples prepared for the demo? Second, can important conclusions be traced to specific evidence? Third, does the system exit safely when there is no answer, permission is missing, or a tool fails? Fourth, can the customer repeat the test with the same samples?

Counterexamples are common. The model answers correctly during the demo, but the index is not refreshed after documents change. Several departments share one knowledge space. A tool returns partial success while the interface reports the task as complete. These are not minor improvements for later. They show that the system boundary has not been designed.

I put the chat interface last. The qualification card, data inventory, permission matrix, golden test set, and acceptance sheet come first. Many tasks turn out to fit a structured form, batch process, review queue, or embedded recommendation better than a conversation. Once the interface stops driving the architecture, the solution becomes easier to defend.
