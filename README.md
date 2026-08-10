# Mini Hack — Cohort 3, Session 3 Starter

**Building Agentic Solutions on Avalanche** · Team1 Kenya

Querying on-chain Avalanche data, three ways, in four languages. Pick
the folder that matches what you're building in: **JavaScript**,
**Python**, **Go**, or **Rust**. Every language folder implements the
exact same thing, so you can compare approaches, or just work in
whichever one you're already comfortable with.

## Why four languages

Not every builder in this cohort works in JavaScript. Some of you are
Python developers, some write Go day to day, some prefer Rust. The
underlying ideas, an agent that can call tools, a provider-agnostic
model layer, three ways to read on-chain data, don't belong to any one
language. So this starter doesn't either.

## What every language folder contains

All four implement the same five things:

| Piece | What it does |
|---|---|
| **Model provider layer** | One factory, four LLM providers (Anthropic, OpenAI, Gemini, Ollama), one shared interface. Anthropic is the only one with tool-calling support right now, the others are plain text chat, clearly marked as such in the code |
| **Direct RPC** | Method 1 from Session 3, raw JSON-RPC against Fuji, no SDK at all |
| **ChainKit fetch** | Method 2, structured wallet transaction history. Where a language has no official ChainKit SDK, this calls the underlying Glacier REST API directly instead |
| **ChainKit MCP agent** | ChainKit running as an MCP server, wired into an agent that calls it as a tool |
| **Normalize** | The shared function every method above uses to turn wei, hex, and Unix timestamps into something a model, or a human, can read |

Method 3 from Session 3, The Graph, is conceptual only in the session
content and isn't implemented here in any language, same as the slides.

## Picking a language

| Language | Best if you... | Folder |
|---|---|---|
| JavaScript | Already know the Session 1 and 2 starters, want the least friction | [`javascript/`](./javascript) |
| Python | Prefer Python's syntax, or you're coming from a data/ML background | [`python/`](./python) |
| Go | Want a compiled, statically-typed agent, or you're building something you'll actually deploy | [`golang/`](./golang) |
| Rust | Want maximum performance and compile-time safety, and don't mind a steeper learning curve | [`rust/`](./rust) |

You only need to submit your Week 2 deliverable in **one** language.
Pick the one you're building in and ignore the rest, or read a couple of
them side by side if you're curious how the same pattern looks
different in different type systems.

## A note on how honestly this was built

Every file in every language folder was actually compiled (or
syntax-checked, for the dynamic languages) against real installed
dependencies before it shipped, not just written and assumed correct.
Where a real problem turned up, wrong import name, wrong SDK method,
wrong dependency version, it was caught and fixed before you ever saw
it. Where an official SDK doesn't exist for a language (there's no
official ChainKit SDK outside JavaScript, and no official Anthropic,
OpenAI, or Google SDK for Rust at the time this was written), the code
says so directly in a comment rather than pretending otherwise, and
falls back to calling the underlying REST API directly, which is a
completely legitimate way to build this, and arguably a better way to
learn what the SDKs are actually doing for you.

## Setup, per language

Each language folder has its own README with exact setup steps, since
the tooling is different in each. The short version:

- **JavaScript**: `npm install`, copy `.env.example` to `.env`, `npm run direct-rpc` / `fetch-transactions` / `mcp-agent`
- **Python**: `pip install -r requirements.txt`, copy `.env.example` to `.env`, `python direct_rpc.py` / `chainkit_fetch.py` / `chainkit_mcp_agent.py`
- **Go**: copy `.env.example` to `.env`, `go run ./direct-rpc` / `./chainkit-fetch` / `./chainkit-mcp-agent`
- **Rust**: copy `.env.example` to `.env`, `cargo run --bin direct_rpc` / `chainkit_fetch` / `chainkit_mcp_agent`

## Submission

Same flow as Week 1, regardless of which language you build in: test it
yourself, screenshot the working test and your PR, post on X tagging
**@code_mwangi** and **@AvaxAfrica**, then submit that link on the quest
page. Full steps are in each language folder's README.

## Model provider, the short version

Every language folder's model-provider module reads `MODEL_PROVIDER`
from `.env` (defaulting to `anthropic`) and gives you back a client with
the same shape no matter which provider you picked. Only the Anthropic
path supports tool calling today, that's explained inline in every
language's model-provider file, not hidden. If your Week 2 agent needs
tools, and it does, build on Anthropic until the others catch up.
