# Session 3 Starter — Rust

Querying on-chain Avalanche data, three ways. Compiled, memory-safe,
zero-cost abstractions, all the usual reasons you'd reach for Rust.

> Looking for every command in one place, across all four languages?
> See [`COMMANDS.md`](../COMMANDS.md) at the repo root.

## Setup

```bash
cp .env.example .env
# fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS at minimum
cargo build
```

Requires Rust 1.85 or newer (the `2021` edition needs a reasonably
current toolchain, this was built and verified against 1.91). If
`cargo build` complains about edition support, update with `rustup
update` or your system package manager.

## Layout

Like Go, Rust wants one binary per `fn main()`, so each runnable
example lives in `src/bin/`, and the shared code lives in the library:

| Path | What it is |
|---|---|
| `src/modelprovider.rs` | Provider abstraction module: `new_model_client()`, four providers, one shared async interface |
| `src/normalize.rs` | Shared wei-to-AVAX, hex-to-decimal, Unix-to-ISO8601 conversion |
| `src/bin/direct_rpc.rs` | Method 1: raw JSON-RPC over plain HTTP, no SDK at all |
| `src/bin/chainkit_fetch.rs` | Method 2: calls the Glacier REST API directly |
| `src/bin/chainkit_mcp_agent.rs` | ChainKit as MCP server, using the `rmcp` crate |

## Running each one

```bash
cargo run --bin direct_rpc
cargo run --bin chainkit_fetch
cargo run --bin chainkit_mcp_agent
```

For `chainkit_mcp_agent`, start the ChainKit MCP server in another
terminal first (needs Node.js, ChainKit itself is JS-only):

```bash
npx -y @avalanche-sdk/chainkit mcp start --transport sse
```

Put the SSE endpoint it prints (e.g. `http://localhost:2718/sse`) into
`CHAINKIT_MCP_URL` in your `.env`.

## A note on SDKs in this folder

There is no official Rust SDK from Anthropic, OpenAI, or Google at the
time this was written, unlike Python, JavaScript, and Go, which all
have first-party SDKs. Rather than depend on an unofficial crate of
uncertain quality, every provider in `modelprovider.rs` talks to its
REST API directly with `reqwest`. This is documented in the module's
own doc comment, not hidden, and it's a genuinely good way to see what
those SDKs are doing for you in any other language.

The one real SDK dependency here is `rmcp` for the MCP client, which is
maintained and does have official backing, that one's a real crate, not
a REST fallback.

## Model provider

`MODEL_PROVIDER` in `.env` picks the provider (`anthropic`, `openai`,
`gemini`, or `ollama`), defaulting to `anthropic`. Only the Anthropic
path implements tool calling, required for `chainkit_mcp_agent`, the
other three are plain text chat, clearly marked as such in
`modelprovider.rs`.

## Submission

1. Fork this repo and create a `week-2-{your-github-handle}` branch.
2. Test everything yourself, confirm it actually works.
3. Screenshot the working test.
4. Open your PR (branch → your fork's `main`), screenshot that too.
5. Post on X with both screenshots, tag **@code_mwangi** and **@AvaxAfrica**.
6. Copy your post link, submit it on the quest page once it's live, and
   share both links in the WhatsApp community.

Full steps, PR title format, and the PR template are in
[`CONTRIBUTING.md`](../CONTRIBUTING.md#submission-steps) at the repo
root.

Cohort WhatsApp group for anything you get stuck on.

## Contributing

Fixing a bug or improving this starter itself, rather than building
your Week 2 submission? See
[`CONTRIBUTING.md`](../CONTRIBUTING.md#improving-the-starter-itself)
at the repo root.
