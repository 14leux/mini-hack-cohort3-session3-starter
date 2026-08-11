# Session 3 Starter — Python

Querying on-chain Avalanche data, three ways. Same pattern as the
JavaScript starter, Python idioms throughout.

> Looking for every command in one place, across all four languages?
> See [`COMMANDS.md`](../COMMANDS.md) at the repo root.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
# fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS at minimum
```

## Files

| File | What it does |
|---|---|
| `model_provider.py` | Provider abstraction: `create_model_client()`, four providers, one shared async interface |
| `direct_rpc.py` | Method 1: raw JSON-RPC via `web3.py`, no external chain SDK needed |
| `chainkit_fetch.py` | Method 2: calls the Glacier REST API directly (there is no official ChainKit Python package, see the note in the file) |
| `chainkit_mcp_agent.py` | ChainKit as MCP server, using the official `mcp` Python SDK |
| `normalize.py` | Shared wei-to-AVAX, hex-to-decimal, Unix-to-ISO8601 conversion |

## Running each one

```bash
python direct_rpc.py
python chainkit_fetch.py
python chainkit_mcp_agent.py
```

For `chainkit_mcp_agent.py`, start the ChainKit MCP server in another
terminal first (this still needs Node.js installed, ChainKit itself is
JS-only):

```bash
npx -y @avalanche-sdk/chainkit mcp start --transport sse
```

Put the SSE endpoint it prints (e.g. `http://localhost:2718/sse`) into
`CHAINKIT_MCP_URL` in your `.env`.

## A note on ChainKit specifically

There is no official ChainKit SDK for Python. `chainkit_fetch.py` calls
the Glacier REST API that ChainKit itself wraps in JavaScript, directly.
Verify the exact endpoint shape against Glacier's current docs before
you build on this, it was written from the documented API shape, not
tested against a live key, that limitation is stated in the file itself
too.

## Model provider

`MODEL_PROVIDER` in `.env` picks the provider (`anthropic`, `openai`,
`gemini`, or `ollama`), defaulting to `anthropic`. Only the Anthropic
path implements tool calling, required for `chainkit_mcp_agent.py`, the
other three are plain text chat, clearly marked as such in
`model_provider.py`.

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
