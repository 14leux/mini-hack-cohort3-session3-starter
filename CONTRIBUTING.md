# Contributing Guide — Cohort 3, Session 3

This covers two different things: submitting your own Week 2
deliverable built on top of this starter (most of you, most of the
time), and contributing a fix to the starter repo itself (typos, bugs
in the example code, docs that drifted). Submission steps first.

## Submission steps

1. Fork this repo to your personal GitHub account.
2. Create a branch named `week-2-{your-github-handle}`, e.g.
   `week-2-scotch`.
3. Build your deliverable on that branch, in whichever language folder
   you picked (`javascript/`, `python/`, `golang/`, or `rust/`, see the
   [root README](./README.md#picking-a-language) if you haven't chosen
   yet) — don't touch `main`.
4. Test it yourself and confirm it actually works before you do
   anything else. Exact run commands for every language are in
   [COMMANDS.md](./COMMANDS.md).
5. Take a screenshot of your working test — a real terminal run, not a
   code editor view.
6. Open a pull request from your branch to your fork's `main` branch.
7. PR title format: `[Cohort 3 · Week 2] Your Name — Deliverable title`.
8. Fill in the PR template completely: what you built, what works,
   what doesn't, which language and model provider you used, and your
   public URL or Fuji deployment link if relevant. Reference copy:
   [`docs/PULL_REQUEST_TEMPLATE.md`](./docs/PULL_REQUEST_TEMPLATE.md).
9. Take a screenshot of the PR you just opened.
10. Post on X: a detailed post with both screenshots (working test +
    PR), tagging **@code_mwangi** and **@AvaxAfrica**. See the template
    below.
11. Copy the link to your X post.
12. Submit that link on the quest page (link going up in the WhatsApp
    community once it's live — hold onto your link until then).
13. Share both your PR link and your X post link in the WhatsApp
    community — the X post is in addition to the PR link, not instead
    of it.

## X post template

Don't just post a link, say what you actually built. Something like:

> Just shipped my Week 2 on-chain data agent for @AvaxAfrica's Mini
> Hack Cohort 3 🛠️
>
> Built it in [JavaScript / Python / Go / Rust] with [Claude / GPT /
> Gemini], querying Avalanche Fuji three ways — [one line on what it
> does, e.g. "raw RPC, a ChainKit wallet-history fetch, and a
> tool-calling agent wired into ChainKit as an MCP server"].
>
> [screenshot: working test] [screenshot: the PR]
>
> Cohort 3 · Building Agentic Solutions on Avalanche cc @code_mwangi
>
> [link to your PR]

Swap in your own details, which language you picked, which method was
hardest, what you'd build next. A post that actually says something
gets more engagement than a bare link, and it's a better record of
your own progress too.

## Code style

The underlying rule is the same in every language: handle errors for
real, don't fake it. Specifics per language:

- **JavaScript**: `async`/`await`, not `.then()` chains.
- **Python**: `async`/`await` on the async paths (`httpx`, `mcp`), no
  bare `except:`.
- **Go**: check every returned `error` explicitly, don't discard it
  with `_`.
- **Rust**: propagate with `?` / `Result`, don't leave an `unwrap()` in
  code you're submitting.
- Every tool call and API call gets real error handling in whichever
  form your language uses, not a silent failure.
- No API keys in code — `.env` only. Every language folder already
  git-ignores `.env`, keep it that way.
- Comment the why, not the what — the code should already say what it
  does.
- If you switch `MODEL_PROVIDER` away from the default (`anthropic`) in
  your language's model-provider file, say so in your PR description.
  The grading rubric doesn't care which model you used, but reviewers
  need to know what they're testing.

## Getting unblocked

Post in the WhatsApp community first. Tag the Technical Lead only if
you've been stuck for more than 30 minutes.

## Improving the starter itself

Found a bug in the starter's own code, not your submission, or want to
fix a stale doc? Open a PR against this repo directly rather than your
fork, and keep these in mind:

- **Keep the four languages in parity.** All four folders implement
  the exact same five pieces: model provider layer, direct RPC,
  ChainKit fetch, ChainKit MCP agent, normalize helpers. If you fix a
  bug or improve behavior in one language, check whether the same issue
  exists in the other three before opening a PR.
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
  opening a PR.
- **Keep docs in sync with code.** If you change a command, a script
  name, an environment variable, or a run step, update it everywhere
  it's documented: that language's own `README.md`, the root
  [README.md](./README.md), and [COMMANDS.md](./COMMANDS.md).
- **No dead abstractions.** Don't add error handling, config flags, or
  generalized helpers for cases the starter doesn't hit. This is a
  teaching repo; keep it as easy to read as it is to run.

For a bug report rather than a fix, open an issue with: which language
folder and file, the exact command you ran (see
[COMMANDS.md](./COMMANDS.md)), what you expected vs. what happened
including the full error output, and your language/runtime version
(`node -v`, `python3 --version`, `go version`, `rustc --version`, as
relevant).
