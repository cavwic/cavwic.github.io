---
title: "Embodied-robotics presales and delivery: from site survey to failure recovery"
description: "A qualification and POC method for embodied-robot projects covering the site, task state machine, body and interfaces, safety, exceptions, service, and acceptance."
locale: en
kind: whitepaper
industry: robotics
evidence: [公开资料研究, 个人实践, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: true
tags: [embodied robotics, POC, site survey, safety, delivery]
sourceIds: [ref-17, ref-18, ref-19, ref-22, ref-23, ref-24, ref-25, ref-26, ref-41, ref-45, ref-46, job-06, job-23, job-24, job-26, job-27, job-30, job-31]
alternatePath: /library/embodied-robotics-presales-delivery
---

## A smooth demo does not establish a solution

Robot demonstrations usually prepare the environment in the robot's favor: a fixed route, correctly placed objects, stable network, and cooperative people. Customer sites are different. Floors have joints, light changes, people cross the route, upstream processes run late, objects arrive reversed, and elevators or access-control systems lose connection.

I treat failure scripts as part of the solution. The proposal must state when the robot stops, retries, reroutes, asks for help, and returns to a state from which work can continue. A success path alone cannot establish deliverability.

## Qualify the scenario before choosing a robot

A site survey is not just a corridor-width measurement. It must establish why the task exists, who performs it, when it occurs, how upstream and downstream handoffs work, and who is affected by failure.

A scenario qualification sheet should include:

- **Task objects:** size, mass, material, variation, placement error, fragility, and hazard;
- **Space:** corridors, slopes, flooring, doors, elevators, workstations, restricted areas, and people flow;
- **Cycle:** average and peak cycle, waiting, shifts, charging, maintenance, and exception recovery;
- **Systems:** network, maps, WMS, MES, access control, elevator interfaces, clocks, and identity;
- **Safety:** human exposure, hazards, emergency stops, protective stops, isolation, and the site owner;
- **Service:** spare parts, remote support, site-response time, training, versions, and change management.

If a fixed fixture or simpler automation can complete the task more reliably, adding embodied complexity is the wrong answer. Good presales work includes disqualifying weak opportunities early.

## Write the task as a state machine

"Fetch the material and deliver it to the workstation" is not a testable task. A state machine can separate standby, order receipt, qualification, navigation, object detection, grasping, confirmation, transport, delivery, receipt, and charging. Each state needs entry and completion conditions, timeout, retry count, and an exit path.

A grasp failure cannot be reduced to "retry automatically." At minimum, distinguish missing detection, unreachable pose, collision risk, unstable grip, object slip, and sensor fault. Each cause requires a different response. Blind repetition expands risk.

## Body selection follows the task

Robot specifications cannot be compared in isolation. Payload depends on arm extension, acceleration, and the end tool. Endurance includes compute, sensors, waiting, and charging strategy. Reach includes pose, collision, and accessibility. Speed is evaluated under safety limits and target success rate.

The proposal also needs to state:

1. whether perception runs onboard, at the edge, or in the cloud;
2. how the task system issues commands and confirms state;
3. how maps, models, policies, and configuration are versioned;
4. which interfaces the vendor owns and which belong to the integrator or customer;
5. where the robot stops after network loss, service failure, or a local fault.

A parameter absent from public material remains "Not public" and enters the vendor-question list. Turning an unknown into a default capability is one of the most dangerous shortcuts in presales.

## Safety does not belong in an appendix

Industrial and collaborative robots have relevant safety-standard entry points, but each project still requires a risk assessment for its equipment, task, and site. A standards webpage cannot replace the licensed standard or qualified on-site judgment.

The solution should mark hazardous areas, human approach paths, emergency-stop locations, protective-stop conditions, recovery permissions, and maintenance lockout. Systems with arms, mobile bases, or dexterous hands also introduce pinch, crush, drop, tip-over, uncontrolled-motion, and battery risks.

"Obstacle avoidance included" is not a safety plan. Avoidance covers part of perception and planning, not every mechanical, electrical, control, software, and operating hazard.

## A POC is not an improvised site trial

Before arrival, define the object set, site version, number of tasks, human roles, and recording method. An executable acceptance matrix can include:

| Dimension | Evidence to record |
| --- | --- |
| Task success | State for every run, failure point, human intervention, final result |
| Cycle time | Complete cycle under normal, peak, waiting, and recovery conditions |
| Navigation | Route completion, blockage, replanning, and localization loss |
| Manipulation | Detection, reachability, grasp, retention, placement, and object damage |
| Safety | Trigger, stopping behavior, recovery permission, and log |
| Stability | Continuous operation, charging, heat, network variation, and software restart |
| Service | Diagnosis time, spare parts, remote support, and site response |

Keep the failed samples. A compilation of successful clips removes the delivery evidence that matters most.

## Build the responsibility matrix before pricing

Embodied-robot projects can involve the body vendor, algorithm team, integrator, customer IT, site-equipment vendor, and business team. An interface without an owner eventually becomes the project manager's problem.

The responsibility matrix should cover site changes, network, power, maps, interfaces, object standardization, safety assessment, training, spare parts, version upgrades, and acceptance signatures. Each priced resource should correspond to a delivery action. A generic implementation fee is difficult to explain and harder to accept.

A professional proposal does not promise that the robot can do everything. It states the conditions under which the system can perform the task, how it exits when it cannot, and which evidence is still missing before the next phase.
