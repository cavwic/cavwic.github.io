# CSV checker: change contract and verification handoff

This demonstrates task organization, not an implemented application. All verification is unexecuted. Read actual paths, commands and framework choices from the target repository rather than inventing them from this example.

## Change contract

Add CSV import, missing-column and duplicate checks, and error-list export to an existing app. Preserve source files, keep processing local and retain the framework. Do not commit, push or deploy.

Confirm required columns, the business definition of duplication, encoding and maximum input size. An identical row and a duplicate business record are not automatically the same rule. Record unresolved choices explicitly.

## Implementation slices

Inspect the working-tree diff, current import entry point, storage and tests. Protect existing user changes. Complete input, validation, results and export without writing to the source file. Add empty, invalid, cancelled and repeated actions, followed by narrow-screen and keyboard checks. Review dependencies and data boundaries before handing off.

## Verification record

| Case | Expected outcome | Actual status |
| --- | --- | --- |
| Valid file | Correct counts and an explicit no-error state | Not run |
| Empty file | Clear message without stale results | Not run |
| Missing columns | Identify missing names; stop invalid parsing | Not run |
| Duplicate records | Locate records using the agreed definition | Not run |
| Cancellation | Preserve a coherent prior state | Not run |
| Reopened export | Correct content, encoding and source locations | Not run |

## Interrupted-work handoff

Record changed files, entry point, actual commands and exit status, reasons for unrun checks, preserved user data, running services and next action. If a dependency prevents a build, record a blocker, not a pass. Revert only the identified change; do not clear the workspace or undo pre-existing user work.
