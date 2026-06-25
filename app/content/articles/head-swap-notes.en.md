---
slug: head-swap-notes
lang: en
title: Head Swap Notes — Donor Matching and Common Pitfalls
date: 2026-06-20
tag: Head Swap
desc: Head swap is a high-barrier operation in data recovery. Notes on donor matching and common failure points.
---

## When a head swap is needed

When the head stack is damaged (dropped head, burnt preamp, deformed slider) but the platters are usually intact, you must open the drive in a clean environment and replace the head stack assembly (HSA) to read the data.

## How to choose a donor

A head swap needs a **matching donor drive**. Priority order:

1. **Same model + same firmware version** (best)
2. Same model + different batch (usually works)
3. Same family, different model (sometimes compatible, may need tuning)

The closer the serial number and manufacturing date, the higher the success rate.

## Common failure points

- **Clean environment**: head swap must be done in a clean bench; a single dust particle can scratch a platter.
- **Head preload**: make sure heads are parked before installation; never let sliders touch the platter surface.
- **Screw torque**: uneven torque on the HSA screws can tilt the heads and cause read errors.
- **Initialize slowly**: after reassembly, do not spin up to full speed immediately. Use tools to initialize slowly and verify parking/seeking.

## Not guaranteed

Even with a perfect donor and technique, recovery can still fail if the **platters are already scratched**. Evaluate data value before opening, and consider platter-level imaging first.
