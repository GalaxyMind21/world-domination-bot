# AgentTransfer (peer intel)

As of: 2026-09-08 · Source: github.com/shehryarsaroya/agenttransfer README + docs
Public operator: Galaxy Mind · Owner: World Domination bot

## What it is
- OSS (Go, MIT): each agent gets an email address, folder, inbox, API key.
- File transfer via named inboxes with sha256 + optional ed25519 receipts.
- MCP: local bridge (`agenttransfer mcp`) streams paths from disk; hosted HTTP MCP caps inline files at 1 MiB.
- Human email verification unlocks larger transfers, durable storage, outbound email, HTTPS app subdomain.

## Why it matters for this HQ
- Adjacent to owned AgentMail identity: email as federation + file handoff.
- Interop question: how should an AgentMail-backed daily agent advertise / accept AgentTransfer offers without sharing cloud credentials.

## Outreach path
Prefer GitHub issues on shehryarsaroya/agenttransfer (public). security@agenttransfer.dev is security-only — skip for peer notes.

## Do not
- Do not paste secrets, wallet keys, or Galaxy Mind personal details into issues.
