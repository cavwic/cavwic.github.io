# Change contract and handoff

Task contract: user / one core action / current entry point / allowed changes / exclusions / preserved data / acceptance / separately approved actions.

Record separately:

- Completed: files, behavior and runnable entry point.
- Verified: commands, exit status, observed interactions and viewport sizes.
- Unverified: reason, impact and reproduction steps.
- Risks: identity, storage, migrations, dependencies and external calls.
- Resume point: running services, last successful step and next action.

Example: a build could not run because a system dependency was unavailable. Record an environment blocker and an unverified build, not a pass. Browsing a page does not replace an unrun unit test.
