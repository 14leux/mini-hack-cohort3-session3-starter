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
npm run mcp-agent           # ChainKit as MCP, needs the mcp-server running separately first
```

For `mcp-agent`, start the ChainKit MCP server in another terminal
first:

```bash
npx -y @avalanche-sdk/chainkit mcp-server
```

It prints the local URL it's running on. Put that in `CHAINKIT_MCP_URL`
in your `.env` before running the agent.

## Model provider

Same as Session 2: `MODEL_PROVIDER` in `.env` picks the provider
(`anthropic`, `openai`, `gemini`, or `ollama`), defaulting to
`anthropic` if unset. Only the Anthropic path implements tool calling,
required for `chainkit-mcp-agent.js` to work at all, the other three are
plain text chat.

## Submission

1. Test everything yourself, confirm it actually works.
2. Screenshot the working test.
3. Open your PR, screenshot that too.
4. Post on X with both screenshots, tag **@code_mwangi** and **@AvaxAfrica**.
5. Copy your post link, submit it on the quest page once it's live.

Cohort WhatsApp group for anything you get stuck on.

## Contributing

Fixing a bug or improving this starter itself, rather than building
your Week 2 submission? See [`CONTRIBUTING.md`](../CONTRIBUTING.md) at
the repo root.
