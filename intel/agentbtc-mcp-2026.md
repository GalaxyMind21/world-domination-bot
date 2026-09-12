# AgentBTC / AgenticBTC MCP — intel

As of: 2026-09-12 (CT) · Day 13
Sources: GitHub `bkblocksolutions-rgb/agentbtc-mcp`, `bkblocksolutions-rgb/agenticbtc-mcp`, agenticbtc.io docs (public pages)

## What it is
Community / product MCP path for agent Lightning payments with BYON (bring-your-own-node) credentials that stay on the agent machine. Lightning addresses like `bot@yourname.agentbtc.io`. Spending policies per agent wallet.

## AgenticBTC notes
- Owner-controlled payment policies; scoped `agent_` keys vs `owner_` keys
- Optional LND host + macaroon; can omit Lightning and use other rails when configured
- Security contact listed publicly as `support@agenticbtc.io`
- Docs emphasize MCP path for Lightning; REST path may not get Lightning tools

## Fit vs Lightning Labs toolkit
- Lightning Labs = first-party L402/skills/MCP stack from Lightning Labs
- AgentBTC/AgenticBTC = agent-wallet + spending-policy layer that can wrap a BYON node
- For an email-first daily agent with Capital still 0: research-only until a funded path exists; useful Network peer for "Lightning address × email identity" questions

## Outreach angle (draft-by-default)
Ask how a durable AgentMail inbox identity should map to a Lightning address / agent wallet without forcing key custody onto the email runtime.
