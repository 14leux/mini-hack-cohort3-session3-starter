# Session 3 Starter — JavaScript

Querying on-chain Avalanche data, three ways. Extends the model-provider
pattern from Sessions 1 and 2 with real on-chain data tools.

> Looking for every command in one place, across all four languages?
> See [`COMMANDS.md`](../COMMANDS.md) at the repo root.

## Setup

```bash
npm install
cp .env.example .env
# fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS at minimum
```

## Files

| File | What it does |
|---|---|
| `model-provider.js` | Same provider abstraction from Session 2, carried forward unchanged |
| `direct-rpc.js` | Method 1: raw RPC via `ethers.js`, `getBalance`/`getBlock`/`getTransactionCount` |
| `chainkit-fetch.js` | Method 2: structured wallet history via the real `@avalanche-sdk/chainkit` SDK |
| `chainkit-mcp-agent.js` | ChainKit running as an MCP server, wired into a tool-calling agent |
| `normalize.js` | Shared wei-to-AVAX, hex-to-decimal, Unix-to-ISO8601 conversion, used by all three data methods |

## Running each one

```bash
npm run direct-rpc          # Method 1, no API key needed beyond the RPC endpoint itself
npm run fetch-transactions  # Method 2, needs GLACIER_API_KEY
npm run mcp-agent           # ChainKit as MCP, needs the mcp server running separately first
```

For `mcp-agent`, start the ChainKit MCP server in another terminal
first:

```bash
npx -y @avalanche-sdk/chainkit mcp start --transport sse
```

It prints the local host/port it's listening on. Put the SSE endpoint
(`http://localhost:2718/sse`, port defaults to 2718) in `CHAINKIT_MCP_URL`
in your `.env` before running the agent.

## Model provider

Same as Session 2: `MODEL_PROVIDER` in `.env` picks the provider
(`anthropic`, `openai`, `gemini`, or `ollama`), defaulting to
`anthropic` if unset. Only the Anthropic path implements tool calling,
required for `chainkit-mcp-agent.js` to work at all, the other three are
plain text chat.

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
