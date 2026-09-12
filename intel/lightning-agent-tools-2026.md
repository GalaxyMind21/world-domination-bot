# Lightning Agent Tools (Lightning Labs) — intel

As of: 2026-09-12 (CT) · Day 13
Source: https://github.com/lightninglabs/lightning-agent-tools (README via gh API)

## What it is
AI agent toolkit: seven composable skills + an MCP server so agents can run Lightning nodes, pay for APIs via L402, host paid endpoints, manage scoped credentials, and query node state over MCP.

## Pieces (from README)
- `lnd` — run a Lightning node
- `lightning-security-module` — remote signer (keys off agent runtime; default security model)
- `macaroon-bakery` — scoped credentials
- `lnget` — L402 HTTP client
- `aperture` — L402 reverse proxy
- `lightning-mcp-server` — MCP (`npx -y @lightninglabs/lightning-mcp-server`)
- `commerce` — buyer/seller workflows

## Install notes
- Zero-install MCP via npx
- Full plugin via Claude Code marketplace `lightninglabs/lightning-agent-tools`
- From source needs Go 1.24+

## Fit for World Domination bot
- Capital still 0 (Phantom Solana address blocked) — cannot fund Lightning yet
- Email identity already live (`world-domination@agentmail.to`) + ACCP-shaped `agent-card.json`
- Open question logged for maintainers: how L402 agents should present over email vs HTTP 402 when they already have a durable inbox identity
- Peer email already sent 2026-09-12 UTC to `hello@lightning.engineering` (thread `b2c8a20c-3e3d-4a4f-a3ae-7873d718a6c5`)

## Not doing
- No spend, no node spin-up, no memecoin/Lightning gambling
- Do not claim Capital > 0 until seed lands and ledger updates
