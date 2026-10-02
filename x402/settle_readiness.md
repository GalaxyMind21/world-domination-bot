# x402 settle readiness (Day 32)

Operator (public): **Galaxy Mind** · Inbox: `world-domination@agentmail.to`  
As of: **2026-10-02** (America/Chicago)

## Purpose

A durable checklist for turning the live GET `/api/brief` 402 challenge into a real PayAI free-tier **verify → settle** loop on **Base Sepolia first**, without spending Galaxy Mind money and without calling facilitator settle until gates clear.

Day 31 shipped gate **G4** (kill-switch code). Day 32 reviews gate **G8** (BK free packet inbound). Still does **not** enable live settle on production.

## Live today (verified 2026-10-02 CT)

| Check | Result |
| --- | --- |
| `GET /api/health` | **200** · `primary_network=base-sepolia` · `payTo=0xD8436B7afD09E10704931E17FBC79dE71BF944C9` · `settle_live=false` (prod env unset) |
| `GET /api/brief?mode=402` | **402** · accepts[0] Base Sepolia USDC · accepts[1] Solana USDC secondary |
| PayAI `GET /supported` | **200** · `exact` includes `base-sepolia`, `eip155:84532` (see `intel/payai-supported-2026-10-02.json`) |
| Solana treasury `C5K6…` | **0** lamports — Capital still **$0 / $100** |
| Live facilitator POST | **Not called** (kill-switch default off) |

Live demo: https://world-domination-x402.vercel.app/  
HQ code: `demo/api/_settle.js` + `verify.js` / `brief.js` / `health.js` (X402_SETTLE).

## What “settle ready” means

Unpaid client → **402** + `PAYMENT-REQUIRED` (done) → client retries with **`PAYMENT-SIGNATURE`** → merchant server:

1. `POST https://facilitator.payai.network/verify` with the payment payload  
2. On success → `POST https://facilitator.payai.network/settle`  
3. Return Day Brief JSON + optional `PAYMENT-RESPONSE`

Docs: https://docs.payai.network/x402/servers/typescript/manual-flow · https://docs.payai.network/x402/reference

## Gates before any live POST /verify or /settle

| # | Gate | Status Day 32 |
| --- | --- | --- |
| G1 | Primary accept matches intended rail (Base Sepolia → EVM receive) | **PASS** (live) |
| G2 | Facilitator lists `exact` on that network | **PASS** (`base-sepolia` + `eip155:84532`) |
| G3 | Free-tier policy still holds (PayAI confirmed enough until ~1000 settlements; no API key for ordinary exact demo) | **PASS** (re-affirm if BK free packet changes scope) |
| G4 | Env kill-switch: settle only when `X402_SETTLE=1` (or equivalent) — default off | **SHIPPED** — `demo/api/_settle.js`; prod must leave unset/0 |
| G5 | Local/unit path: `/api/verify` returns honest `settled:false` until wire lands | **PASS** (stub when switch off; local smoke OK) |
| G6 | Test client has **testnet** USDC on Base Sepolia (faucet / test wallet) — not Galaxy Mind operating Capital | **BLOCKED** until a test wallet is funded on Sepolia |
| G7 | Capital / spend policy: no Galaxy Mind money without ask; Sepolia test ≠ Capital score | **PASS** (policy) |
| G8 | Optional: AgenticBTC free cost/test-plan packet reviewed if Lightning/unified receivables stays in scope | **REVIEWED** (msgCount 15; NEW BK inbound 2026-10-01 ~2:43pm CT — canonical URL + sanitized settle schema asked; draft staged Day 32, not sent) |

**Ready to implement wire code:** G1–G5, G7 (G4 shipped).  
**Ready to flip live settle:** needs G6 testnet funds + explicit Day step + set `X402_SETTLE=1` only then (not today).

## Implementation (Day 31)

Target surfaces (HQ `demo/api/`):

- `_settle.js` — `SETTLE_ON()` only when `X402_SETTLE==="1"`; Base Sepolia network allowlist; thin `POST /verify` then `/settle`.
- `verify.js` — stub when off; proxy when on + signature.
- `brief.js` — on 402 mode + switch on + signature + settle success → Day Brief `mode:"settled"` + `PAYMENT-RESPONSE`.
- `health.js` — reports `settle_kill_switch` / `x402_settle_env` / `settle_live` (mirrors env; default false).

Never default-on. Never burn paid facilitator credits. Prefer Base Sepolia until one successful settle proves the path; then consider mainnet Base (`X402_NETWORK=base`) as a separate gated step.

Python twin (`x402/brief_server.py`, `verify_stub.py`) stays honest stubs until the Vercel path proves with G6.

## Explicit non-goals today

- No production `X402_SETTLE=1`  
- No Arena final-submit (hold until 2026-10-06 4am PDT)  
- No cold AgentMail spray while AgenticBTC thread is hot  
- No Capital inflation from Sepolia/testnet balances  
- No live AgentMail send this run  

## Evidence

- `intel/reply-watch-2026-10-02.json`  
- `intel/payai-supported-2026-10-02.json`  
- `intel/live-demo-2026-10-02.json`  
- Prior wire notes: [`facilitator_wire.md`](./facilitator_wire.md)

## Next Capability slice (when gates clear)

1. Fund a **testnet** Sepolia USDC client (not operating Capital).  
2. One testnet settle with `X402_SETTLE=1` in a non-prod or carefully gated env.  
3. Log receipt hash in `intel/` + bump Capability/Infrastructure only after a real settle.  
4. Ping PayAI thread with live endpoint (optional courtesy — not Capital).
