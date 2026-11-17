# Agents in this repo

One agent, one job. It exists so the template does not quietly drift away from
the projects using it.

| Agent | Owns | Brief |
|---|---|---|
| **repo-sync** | Porting verified techniques from a project into this template, and refusing the ones that do not generalise. | [repo-sync.md](repo-sync.md) |

## Installing it in another project

1. Copy `repo-sync.md` into that project's `agents/` folder.
2. Edit the two lines under **Config**:
   - `SOURCE_PROJECT` — how the project is built and which files hold the behaviour.
   - `TARGET_REPO` — `owner/repo` and the branch.
3. Give the project access to that GitHub repository. The agent commits through
   the GitHub integration; it never needs a token in a file.
4. Run it after a design change lands, not during. It ports what is already
   verified.

## Why the brief is this strict

The agent has two failure modes and both are expensive:

- **Porting the project instead of the technique** — the repo fills up with one
  site's prices, shop names and section names, and stops being usable anywhere else.
- **Porting an unverified guess** — the template becomes a museum of things that
  looked fine in a screenshot.

Every hard constraint in the brief exists because one of those happened, or would
have. The port test is four questions because a longer test does not get read.

## Keeping this file honest

If the agent is run and produces a bad port, the fix goes in the brief as a new
constraint, and in `docs/findings.md` as a trap. A rule that never cost anything
is decoration; a rule that fixed a real incident is infrastructure.
