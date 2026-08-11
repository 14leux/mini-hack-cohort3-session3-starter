# COMMANDS.md

Every command you need to set up, configure, and run this repo, broken
out by language. Each language folder implements the same five pieces
(model provider layer, direct RPC, ChainKit fetch, ChainKit MCP agent,
normalize helpers) against Avalanche Fuji — pick the section for the
language you're building in and follow it top to bottom.

## Table of Contents

- [Prerequisites (all languages)](#prerequisites-all-languages)
- [Shared environment variables](#shared-environment-variables)
- [JavaScript](#javascript)
  - [1. Install dependencies](#1-install-dependencies)
  - [2. Configure environment](#2-configure-environment)
  - [3. Run Method 1 — Direct RPC](#3-run-method-1--direct-rpc)
  - [4. Run Method 2 — ChainKit fetch](#4-run-method-2--chainkit-fetch)
  - [5. Run Method 3 — ChainKit MCP agent](#5-run-method-3--chainkit-mcp-agent)
- [Python](#python)
  - [1. Create and activate a virtual environment](#1-create-and-activate-a-virtual-environment)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Configure environment](#3-configure-environment)
  - [4. Run Method 1 — Direct RPC](#4-run-method-1--direct-rpc)
  - [5. Run Method 2 — ChainKit fetch](#5-run-method-2--chainkit-fetch)
  - [6. Run Method 3 — ChainKit MCP agent](#6-run-method-3--chainkit-mcp-agent)
- [Go](#go)
  - [1. Install dependencies](#1-install-dependencies-1)
  - [2. Configure environment](#2-configure-environment-1)
  - [3. Run Method 1 — Direct RPC](#3-run-method-1--direct-rpc-1)
  - [4. Run Method 2 — ChainKit fetch](#4-run-method-2--chainkit-fetch-1)
  - [5. Run Method 3 — ChainKit MCP agent](#5-run-method-3--chainkit-mcp-agent-1)
  - [Updating dependencies](#updating-dependencies)
- [Rust](#rust)
  - [1. Configure environment](#1-configure-environment)
  - [2. Build](#2-build)
  - [3. Run Method 1 — Direct RPC](#3-run-method-1--direct-rpc-2)
  - [4. Run Method 2 — ChainKit fetch](#4-run-method-2--chainkit-fetch-2)
  - [5. Run Method 3 — ChainKit MCP agent](#5-run-method-3--chainkit-mcp-agent-2)
- [Switching model providers](#switching-model-providers)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites (all languages)

Regardless of which language folder you work in, you'll need:

- An **Anthropic API key** (`ANTHROPIC_API_KEY`) — the only provider
  with tool-calling support, required if you want the MCP agent to work.
- A **Glacier API key** (`GLACIER_API_KEY`) — free from
  [avacloud.io](https://avacloud.io), required for ChainKit fetch and
  the ChainKit MCP agent.
- A **Fuji wallet address** (`WALLET_ADDRESS`) to query — yours or any
  public one.
- **Node.js** installed on your machine — even if you're working in
  Go, Python, or Rust, the ChainKit MCP server itself is JS-only and is
  launched via `npx`.

## Shared environment variables

Every language's `.env.example` follows the same shape. Copy it to
`.env` in that language's folder and fill in at minimum
`ANTHROPIC_API_KEY`, `GLACIER_API_KEY`, and `WALLET_ADDRESS`.

| Variable            | Required                        | Notes                                                                                                               |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `MODEL_PROVIDER`    | No                              | `anthropic`, `openai`, `gemini`, or `ollama`. Defaults to `anthropic`.                                              |
| `ANTHROPIC_API_KEY` | Yes (default provider)          | Only provider with tool-calling support.                                                                            |
| `ANTHROPIC_MODEL`   | No                              | Defaults to `claude-sonnet-4-6`.                                                                                    |
| `OPENAI_API_KEY`    | Only if `MODEL_PROVIDER=openai` | Plain text chat only, no tools.                                                                                     |
| `OPENAI_MODEL`      | No                              | Defaults to `gpt-4.1`.                                                                                              |
| `GEMINI_API_KEY`    | Only if `MODEL_PROVIDER=gemini` | Plain text chat only, no tools.                                                                                     |
| `GEMINI_MODEL`      | No                              | Defaults to `gemini-2.5-flash`.                                                                                     |
| `OLLAMA_BASE_URL`   | Only if `MODEL_PROVIDER=ollama` | Defaults to `http://localhost:11434`, no API key needed.                                                            |
| `OLLAMA_MODEL`      | No                              | Defaults to `llama3.1`.                                                                                             |
| `MAX_TOKENS`        | No                              | Defaults to `1024`.                                                                                                 |
| `GLACIER_API_KEY`   | Yes, for ChainKit examples      | Free key from [avacloud.io](https://avacloud.io).                                                                   |
| `CHAINKIT_MCP_URL`  | Yes, for the MCP agent          | The SSE endpoint from `npx -y @avalanche-sdk/chainkit mcp start --transport sse`, e.g. `http://localhost:2718/sse`. |
| `WALLET_ADDRESS`    | Yes                             | Any Fuji wallet address to query.                                                                                   |

---

## JavaScript

Folder: [`javascript/`](./javascript)

### 1. Install dependencies

```bash
cd javascript
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# open .env and fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS
```

### 3. Run Method 1 — Direct RPC

Raw RPC via `ethers.js` (`getBalance` / `getBlock` /
`getTransactionCount`). No API key needed beyond the RPC endpoint
itself.

```bash
npm run direct-rpc
```

### 4. Run Method 2 — ChainKit fetch

Structured wallet transaction history via the real
`@avalanche-sdk/chainkit` SDK. Needs `GLACIER_API_KEY`.

```bash
npm run fetch-transactions
```

### 5. Run Method 3 — ChainKit MCP agent

ChainKit running as an MCP server, wired into a tool-calling agent.
Start the MCP server first, in a **separate terminal**:

```bash
npm run mcp-server
```

Put the SSE endpoint it prints (e.g. `http://localhost:2718/sse`) into
`CHAINKIT_MCP_URL` in `javascript/.env`, then in your original terminal:

```bash
npm run mcp-agent
```

---

## Python

Folder: [`python/`](./python)

### 1. Create and activate a virtual environment

```bash
cd python
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

`requirements.txt` installs the active `anthropic` provider by default.
If you switch `MODEL_PROVIDER` to `openai` or `gemini`, uncomment the
matching line in `requirements.txt` first and re-run `pip install -r
requirements.txt`.

### 3. Configure environment

```bash
cp .env.example .env
# open .env and fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS
```

### 4. Run Method 1 — Direct RPC

Raw JSON-RPC via `web3.py`, no external chain SDK needed.

```bash
python direct_rpc.py
```

### 5. Run Method 2 — ChainKit fetch

Calls the Glacier REST API directly (there is no official ChainKit
Python package).

```bash
python chainkit_fetch.py
```

### 6. Run Method 3 — ChainKit MCP agent

Uses the official `mcp` Python SDK. Start the ChainKit MCP server first,
in a **separate terminal** (still needs Node.js installed):

```bash
npx -y @avalanche-sdk/chainkit mcp start --transport sse
```

Copy the SSE endpoint it prints into `CHAINKIT_MCP_URL` in
`python/.env`, then:

```bash
python chainkit_mcp_agent.py
```

---

## Go

Folder: [`golang/`](./golang)

Requires **Go 1.23 or newer**.

### 1. Install dependencies

```bash
cd golang
go mod download
```

### 2. Configure environment

```bash
cp .env.example .env
# open .env and fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS
```

### 3. Run Method 1 — Direct RPC

Raw JSON-RPC over plain HTTP, no SDK at all.

```bash
go run ./direct-rpc
```

### 4. Run Method 2 — ChainKit fetch

Calls the Glacier REST API directly (no official ChainKit Go package
exists).

```bash
go run ./chainkit-fetch
```

### 5. Run Method 3 — ChainKit MCP agent

Uses `github.com/mark3labs/mcp-go`. Start the ChainKit MCP server first,
in a **separate terminal** (needs Node.js):

```bash
npx -y @avalanche-sdk/chainkit mcp start --transport sse
```

Copy the SSE endpoint it prints into `CHAINKIT_MCP_URL` in
`golang/.env`, then:

```bash
go run ./chainkit-mcp-agent
```

### Updating dependencies

`go.mod` deliberately pins slightly older versions of `mark3labs/mcp-go`
and its transitive deps for toolchain compatibility. If you're on a
newer Go version and want the latest:

```bash
go get -u ./...
# re-test chainkit-mcp-agent afterward, its API has changed across versions before
```

---

## Rust

Folder: [`rust/`](./rust)

Requires **Rust 1.85 or newer** (2021 edition). Verified against 1.91.

### 1. Configure environment

```bash
cd rust
cp .env.example .env
# open .env and fill in ANTHROPIC_API_KEY, GLACIER_API_KEY, WALLET_ADDRESS
```

### 2. Build

```bash
cargo build
```

If `cargo build` complains about edition support, update your
toolchain: `rustup update`, or update via your system package manager.

### 3. Run Method 1 — Direct RPC

Raw JSON-RPC over plain HTTP via `reqwest`, no SDK at all.

```bash
cargo run --bin direct_rpc
```

### 4. Run Method 2 — ChainKit fetch

Calls the Glacier REST API directly.

```bash
cargo run --bin chainkit_fetch
```

### 5. Run Method 3 — ChainKit MCP agent

Uses the `rmcp` crate (the one real official-backed SDK dependency in
this folder). Start the ChainKit MCP server first, in a **separate
terminal** (needs Node.js):

```bash
npx -y @avalanche-sdk/chainkit mcp start --transport sse
```

Copy the SSE endpoint it prints into `CHAINKIT_MCP_URL` in
`rust/.env`, then:

```bash
cargo run --bin chainkit_mcp_agent
```

---

## Switching model providers

Every language reads `MODEL_PROVIDER` from `.env`. Set it to one of
`anthropic` (default), `openai`, `gemini`, or `ollama` in the `.env`
file for the language you're using, then uncomment/fill the matching
key block in that same `.env` file:

```bash
# .env
MODEL_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-key-here
```

Only the **Anthropic** path supports tool calling in every language.
The ChainKit MCP agent (`chainkit-mcp-agent` / `chainkit_mcp_agent`)
requires tool calling, so leave `MODEL_PROVIDER=anthropic` if you plan
to run that example. `openai`, `gemini`, and `ollama` are plain text
chat only, clearly marked as such in each language's model-provider
file.

## Troubleshooting

- **`chainkit-mcp-agent` / `chainkit_mcp_agent` fails to connect** —
  make sure `npx -y @avalanche-sdk/chainkit mcp start --transport sse` is
  still running in its own terminal, and that `CHAINKIT_MCP_URL` in
  `.env` matches the SSE endpoint it printed exactly.
- **ChainKit fetch returns an auth error** — double check
  `GLACIER_API_KEY` is set and valid; get a free key from
  [avacloud.io](https://avacloud.io).
- **Tool calling doesn't work on OpenAI/Gemini/Ollama** — expected.
  Only the Anthropic provider implements tool calling in this starter;
  the rest are plain text chat by design.
- **Go: build errors after `go get -u`** — the `chainkit-mcp-agent`
  example is the most sensitive to `mark3labs/mcp-go` version changes;
  pin back to the versions in `go.mod`/`go.sum` if an upgrade breaks it.
- **Rust: `cargo build` complains about edition 2021** — your Rust
  toolchain is too old; run `rustup update`.
