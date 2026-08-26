---
title: "Dexterous-hand selection and grasp validation: six questions beyond DOF"
description: "A repeatable selection and grasp-test method built around objects, grasps, actuation, tactile sensing, interfaces, heat, and durability."
locale: en
kind: whitepaper
industry: dexterous-hands
evidence: [公开资料研究, 个人实践, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: true
tags: [dexterous hands, end effectors, tactile sensing, grasping, selection]
sourceIds: [ref-29, ref-30, ref-31, ref-32, ref-33, ref-34, ref-35, ref-36, ref-37, ref-38, ref-39, ref-40, job-33, job-34]
alternatePath: /library/dexterous-hand-selection-validation
---

## First question: why not use a gripper?

A dexterous hand is not a gripper with more degrees of freedom. It offers richer contact and in-hand manipulation, and adds actuation, sensing, control, calibration, heat, cabling, and service problems. When objects are fixed, poses are controlled, and cycle time comes first, a dedicated fixture or electric gripper is often more reliable.

Selection therefore starts with the contact changes required by the task and why a simpler end effector cannot handle them. Without that answer, the specification comparison loses its subject.

## 1. Does the object set represent the real task?

A grasp test needs an object set. Record each object's size, mass, material, surface friction, stiffness, fragility, permitted contact areas, initial-pose range, and acceptance tolerance. A set containing only regular rigid objects will overstate capability.

Include boundary cases: smallest, largest, most slippery, softest, most deformable, hardest to locate, and damaged or misplaced packaging. Also separate "picked up" from "task completed." Lifting a cup does not prove that it can be handed over stably without covering the required area.

## 2. What are the DOF, actuator count, and coupling?

Degrees of freedom describe possible motion. Actuator count describes independent control. They are not the same number. An underactuated mechanism can envelop an object with fewer actuators, but its finger joints may not reach arbitrary poses independently. That difference matters for teleoperation, data collection, and precise in-hand work.

Selection needs the joint topology, actuated and coupled DOF, limits, transmission, and control modes. Appearance and total DOF do not establish controllability.

## 3. Do the force definitions match the task?

"Grip force," "fingertip force," and "payload" may use different poses, directions, and measurement conditions. Before comparison, align the definitions: one finger or the whole hand, static or dynamic, fingertip normal force or permitted object load, wrist pose, and friction conditions.

The target is not maximum force. It is enough stability without object damage or overheating. Soft, thin-wall, and fragile objects need force control or compliance. Heavy objects also require a wrist and arm torque check.

## 4. Is the tactile data usable?

Tactile sensing means more than a sensor being present. Check coverage, measured axes, range, resolution, sampling rate, hysteresis, drift, calibration, data access, and time synchronization. Fields absent from public material stay unknown.

Do not test only static presses. Include contact localization, slip, repeated contact, temperature change, long-term zero drift, and simultaneous load on several fingertips. If developers receive processed events rather than raw data, verify whether that interface supports the intended control work.

## 5. Do control and integration share one clock?

The hand must coordinate with the arm, vision, teleoperation, and task system. The solution should state its protocol, control rate, command modes, state feedback, timestamps, error codes, emergency-stop behavior, and response to lost communication.

Many demo failures are timing, coordinate, or state failures rather than grasp-planning failures. A camera frame is stale, hand-eye calibration has shifted, or the arm has arrived while the hand still reports an earlier state. The integration plan needs separate tests for clock synchronization, coordinate frames, recovery, and version compatibility.

## 6. Are heat, life, and maintenance acceptable?

Highly integrated fingers compress motors, reduction, sensing, and cables into limited space. Under continuous grasping, temperature rise, derating, cable bending, gear wear, and tendon wear may matter more than a single peak result.

A durability test must state motion, load, speed, environment, cycle count, and service conditions. Cycle-life figures can be compared only under aligned duty. Record consumables, calibration tools, replacement time, spare-part lead time, and whether site staff can perform the work.

## Build a repeatable grasp record

Each test should record at least:

| Category | Fields |
| --- | --- |
| Object | ID, size, mass, material, surface, initial pose |
| Configuration | Hand model, firmware, control mode, grasp strategy, force threshold |
| Process | Approach, preshape, contact, close, lift, move, place |
| Result | Success, slip, damage, pose error, human intervention |
| Performance | Time, temperature, force, tactile data, communication faults |
| Reproduction | Logs, video, parameter file, operator, and date |

Split success by object and failure type. An average can hide a class of objects that always fails. Weights may be adjusted openly, but missing specifications should not be filled with averages. They reduce confidence and trigger vendor confirmation or hardware testing.

## What a selection conclusion should say

A useful conclusion does not name an overall winner. It says that under a specified object set, arm, control method, and cycle, candidate A has enough public evidence to enter hardware testing; candidate B still needs confirmation on tactile sensing and interfaces; candidate C can be replaced by a simpler end effector.

That answer is less neat than a ranking and more useful for procurement, integration, and acceptance.
