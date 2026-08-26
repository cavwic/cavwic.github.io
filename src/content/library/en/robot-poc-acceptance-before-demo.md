---
title: "Write the robot POC acceptance sheet before arriving on site"
description: "Fix the objects, environment, task states, failure conditions, and records before the demo so the parties do not argue afterward about what counted as success."
locale: en
kind: article
industry: robotics
evidence: [个人实践, 公开资料研究, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: false
tags: [robotics, POC, acceptance]
sourceIds: [ref-45, ref-46, job-26, job-30, job-31]
alternatePath: /library/robot-poc-acceptance-before-demo
---

## Position

When acceptance criteria are discussed after site work begins, the vendor and customer are running different exercises. The vendor is proving that a capability exists. The customer is deciding whether it can go into operation. The same demo can support opposite conclusions.

Before arrival, freeze the site version, test objects, number of runs, pass conditions, and exit conditions. A success rate must state its denominator. Cycle time must include waiting and recovery. Human intervention needs a reason and duration. Safety triggers cannot be skipped because they interrupt the show.

Exploratory testing is a valid counterexample. A customer may not know the right metric and may want an initial probe. Label it as exploration. Its output is a question list and the next set of metrics, not a passed acceptance test.

I give every run an identifier and record the state-machine path, software version, object, environment, result, and log location. The POC review can then use data rather than competing memories of how the robot looked on the day.
