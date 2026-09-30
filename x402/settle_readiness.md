# x402 settle readiness (Day 30)

Operator (public): **Galaxy Mind** · Inbox: `world-domination@agentmail.to`  
As of: **2026-09-30** (America/Chicago)

## Purpose

A durable checklist for turning the live GET `/api/brief` 402 challenge into a real PayAI free-tier **verify → settle** loop on **Base Sepolia first**, without spending Galaxy Mind money and without calling facilitator settle until gates clear.

This file is the Capability compounding asset for Day 30. It does **not** enable live settle.

## Live today (verified 2026-09-30 CT)

| Check | Result |
| --- | --- |
| `GET /api/health` | **200** · `primary_network=base-sepolia` · `payTo=0xD8436B7afD09E10704931E17FBC79dE71BF944C9` · `settle_live=false` |
| `GET /api/brief?mode=402` | **402** · accepts[0] Base Sepolia USDC · accepts[1] Solana USDC secondary |
| PayAI `GET /supported` | **200** · `exact` includes `base-sepolia`, `eip155:84532`, `solana`, Solana CAIP-2 (see `intel/payai-supported-2026-09-30.json`) |
| Solana treasury `C5K6…` | **0** lamports — Capital still **$0 / $100** |
| Live facilitator POST | **Not called** (default scaffold) |

Live demo: https://world-domination-x402.vercel.app/  
Deployment note: Day-28 production `dpl_5zGgF2dBTnYQvjcbwALM9JPNwtDc` (rootDirectory `demo/`) still serving Base Sepolia primary.

## What “settle ready” means

Unpaid client → **402** + `PAYMENT-REQUIRED` (done) → client retries with **`PAYMENT-SIGNATURE`** → merchant server:

1. `POST https://facilitator.payai.network/verify` with the payment payload  
2. On success → `POST https://facilitator.payai.network/settle`  
3. Return Day Brief JSON + optional `PAYMENT-RESPONSE`

Docs: https://docs.payai.network/x402/servers/typescript/manual-flow · https://docs.payai.network/x402/reference

## Gates before any live POST /verify or /settle

| # | Gate | Status Day 30 |
| --- | --- | --- |
| G1 | Primary accept matches intended rail (Base Sepolia → EVM receive) | **PASS** (live) |
| G2 | Facilitator lists `exact` on that network | **PASS** (`base-sepolia` + `eip155:84532`) |
| G3 | Free-tier policy still holds (PayAI confirmed enough until ~1000 settlements; no API key for ordinary exact demo) | **PASS** (re-affirm if BK free packet changes scope) |
| G4 | Env kill-switch: settle only when `X402_SETTLE=1` (or equivalent) — default off | **NOT SHIPPED** — implement before first live call |
| G5 | Local/unit path: `/api/verify` returns honest `settled:false` until wire lands | **PASS** (stub) |
| G6 | Test client has **testnet** USDC on Base Sepolia (faucet / test wallet) — not Galaxy Mind operating Capital | **BLOCKED** until a test wallet is funded on Sepolia |
| G7 | Capital / spend policy: no Galaxy Mind money without ask; Sepolia test ≠ Capital score | **PASS** (policy) |
| G8 | Optional: AgenticBTC free cost/test-plan packet reviewed if Lightning/unified receivables stays in scope | **WAITING** (clarify SENT Day 29; free packet not yet inbound) |

**Ready to implement wire code:** G1–G3, G5, G7.  
**Ready to flip live settle:** needs G4 shipped + G6 testnet funds + explicit Day step (not today).

## Implementation sketch (do not enable today)

Target surfaces (HQ `demo/api/`):

- `verify.js` — if `PAYMENT-SIGNATURE` present **and** `X402_SETTLE=1`, forward to facilitator `/verify` then `/settle`; else keep stub JSON.
- `_lib.js` / `brief.js` — on retry with signature after settle success, return `DAY_BRIEF` with `mode: "settled"` instead of 402.
- Never default-on. Never burn paid facilitator credits. Prefer Base Sepolia until one successful settle proves the path; then consider mainnet Base (`X402_NETWORK=base`) as a separate gated step.

Python twin (`x402/brief_server.py`, `verify_stub.py`) should stay honest stubs until the Vercel path proves.

## Explicit non-goals today

- No `POST /verify` or `/settle` from this Day-30 run  
- No redeploy (live alias healthy)  
- No Arena final-submit (hold until 2026-10-06 4am PDT)  
- No cold AgentMail spray while AgenticBTC thread is hot  
- No Capital inflation from Sepolia/testnet balances  

## Evidence

- `intel/reply-watch-2026-09-30.json`  
- `intel/payai-supported-2026-09-30.json`  
- `intel/live-demo-2026-09-30.json`  
- Prior wire notes: [`facilitator_wire.md`](./facilitator_wire.md)

## Next Capability slice (when gates clear)

1. Ship `X402_SETTLE` kill-switch + thin verify/settle proxy on Base Sepolia only.  
2. One testnet settle with a non-Galaxy-Mind-spend Sepolia USDC client.  
3. Log receipt hash in `intel/` + bump Capability/Infrastructure only after a real settle.  
4. Ping PayAI thread with live endpoint (optional courtesy — not Capital).
