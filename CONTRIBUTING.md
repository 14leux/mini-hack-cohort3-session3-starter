# Contributing

Guidelines for contributing to this starter repo itself, fixing a bug
in one of the language implementations, improving a README, tightening
up a comment that's gone stale. This is separate from submitting your
own Week 2 deliverable; see the [main README](./README.md#submission)
for that flow.

## Before you start

- For anything more than a small fix, open an issue or ask in the
  cohort WhatsApp group first, so effort isn't duplicated and the
  change fits the direction of the starter.
- Skim [COMMANDS.md](./COMMANDS.md) so you know how to actually run
  the thing you're about to change, in every language it touches.

## Ground rules

- **Keep the four languages in parity.** All four folders
  (`javascript/`, `python/`, `golang/`, `rust/`) implement the exact
  same five pieces: model provider layer, direct RPC, ChainKit fetch,
  ChainKit MCP agent, normalize helpers. If you fix a bug or improve
  behavior in one language, check whether the same issue exists in the
  other three before opening a PR.
- **Match each language's existing style.** Don't introduce a
  formatting convention, dependency, or abstraction pattern that isn't
  already used in that folder. When an official SDK genuinely doesn't
  exist for a language (documented case by case in that language's
  README), the fallback is a direct REST call, not an unofficial or
  unmaintained package.
- **No unverified code.** Every file in every language folder was
  actually compiled, or syntax-checked for the dynamic languages,
  against real installed dependencies before it shipped. Keep that bar:
  test your change against real dependencies and a real `.env` before
  opening a PR, don't just write it and assume it's correct.
- **Keep docs in sync with code.** If you change a command, a script
  name, an environment variable, or a run step, update it everywhere
  it's documented: that language's own `README.md`, the root
  [README.md](./README.md), and [COMMANDS.md](./COMMANDS.md).
- **No dead abstractions.** Don't add error handling, config flags, or
  generalized helpers for cases the starter doesn't hit. This is a
  teaching repo; keep it as easy to read as it is to run.

## Making a change

1. Fork the repo and create a branch off `main` with a descriptive
   name (e.g. `fix/go-chainkit-fetch-timeout`).
2. Make your change in the relevant language folder(s).
3. Test it for real: run the affected script(s) end to end with a
   valid `.env`, per the steps in [COMMANDS.md](./COMMANDS.md).
4. Update any README or doc that references the thing you changed.
5. Commit with a clear, specific message describing *why* the change
   was needed, not just what changed.
6. Open a pull request describing what you changed, why, and how you
   tested it. Screenshots of a working run are welcome and helpful for
   reviewers.

## Reporting a bug

Open an issue with:

- Which language folder and file.
- The exact command you ran (see [COMMANDS.md](./COMMANDS.md) for the
  canonical list).
- What you expected vs. what happened, including the full error output.
- Your language/runtime version (`node -v`, `python3 --version`,
  `go version`, `rustc --version`, as relevant).

## Questions

The cohort WhatsApp group is the fastest way to get unstuck or check
whether a change is worth making before you put time into it.
