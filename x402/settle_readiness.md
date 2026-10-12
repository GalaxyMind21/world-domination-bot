# x402 settle readiness (Day 42 — Base mainnet aware)

Operator (public): **Galaxy Mind** · Inbox: `world-domination@agentmail.to`  
As of: **2026-10-12** (America/Chicago)

## Purpose

A durable checklist that must be green before the live v2 paid resource `GET /api/paid-brief` moves from **402 challenge only** to a real PayAI **verify → settle** loop. The live accept is already **Base mainnet USDC** (operator yes 2026-10-08), so any settle now moves real funds. Flipping settle still needs an explicit **Galaxy Mind yes** and a dedicated Day step. Nothing in this file flips it.

History: Day 31 shipped gate G4 (kill-switch code). Day 33 shipped the G6 playbook + dry-run client. Day 35 shipped canonical v2 (`/api/paid-brief`). Day 38 switched the v2 accept to Base mainnet (`X402_V2_NETWORK=base`, settle off) and listed on x402scan. Day 39 aligned `/api/health` to the live 402.

## Live today (verified 2026-10-12 ~9:10 AM CT)

| Check | Result |
| --- | --- |
| `GET /api/health` | **200** · `primary_network=eip155:8453` (Base mainnet) · asset `0x8335…2913` (Base USDC) · `payTo=0xD8436B7afD09E10704931E17FBC79dE71BF944C9` · `settle_live=false` · `x402_settle_env=0` |
| `GET /api/paid-brief` | **402** · x402 v2 · `exact` · `eip155:8453` · amount `1000000` (1.00 USDC) · same asset/payTo as health · extensions `bazaar`, `wd-receipt-binding` |
| Health ↔ 402 match | network ✅ · asset ✅ · payTo ✅ |
| `GET /openapi.json` | **200** · `x-payment-info` `eip155:8453`, `testnet: false`; guidance says check `settle_live` first |
| `GET /.well-known/x402` | **200** · lists `/api/paid-brief` |
| x402scan | [Listed](https://www.x402scan.com/server/792302a9-0547-43f5-8bcf-471b10d7dc10) · 2 resources · **0 tx** |
| PayAI `GET /supported` | **200** · `exact` on `eip155:8453` (v2) and `base` (v1) present (`intel/payai-supported-2026-10-12.json`) |
| Legacy v1 `/api/brief?mode=402` | Base Sepolia · **deprecated** |
| Live facilitator POST | **Not called** (kill-switch off) |
| Capital | Base USDC **0** · Solana treasury **0** → **$0 / $100** |

Live demo: https://world-domination-x402.vercel.app/  
HQ code: `demo/api/_settle.js` + `paid-brief.js` / `verify.js` / `health.js` (`X402_SETTLE`).  
G6 playbook: [`g6_test_client.md`](./g6_test_client.md) · [`g6_dry_run_client.mjs`](./g6_dry_run_client.mjs)

## What “settle ready” means

Unpaid client → **402** + `PAYMENT-REQUIRED` (done, Base mainnet) → client retries with **`PAYMENT-SIGNATURE`** → merchant server:

1. `POST https://facilitator.payai.network/verify` with the payment payload  
2. On success → `POST https://facilitator.payai.network/settle`  
3. Return Day Brief JSON + `PAYMENT-RESPONSE`

Docs: https://docs.payai.network/x402/servers/typescript/manual-flow · https://docs.payai.network/x402/reference

## Gates before any live POST /verify or /settle

| # | Gate | Status Day 42 |
| --- | --- | --- |
| G1 | Primary accept matches intended rail (Base mainnet USDC → EVM receive `0xD843…44C9`) | **PASS** (live 402 + health + OpenAPI agree) |
| G2 | Facilitator lists `exact` on that network | **PASS** — PayAI `/supported` re-checked 2026-10-12: `eip155:8453` (v2) + `base` (v1) |
| G3 | Free-tier policy still holds (PayAI free tier for ordinary exact demo volume) | **PASS** (re-affirm before flip; no new PayAI inbound since 2026-09-16) |
| G4 | Env kill-switch: settle only when `X402_SETTLE=1` — default off | **SHIPPED** — prod unset/0; `settle_live=false` |
| G5 | `/api/verify` + paid retries stay honest (`settled:false` / `402 kill_switch_off`) while switch is off | **PASS** |
| G6 | One **mainnet** funded test payment from a separate test wallet (small, e.g. 1.00 USDC) — test funds are **not** Galaxy Mind operating Capital | **BLOCKED** — no funded test client; any test spend needs Galaxy Mind yes; do not flip settle to get around it |
| G7 | Capital / spend policy: no Galaxy Mind money without ask; test payments ≠ Capital score | **PASS** (policy) |
| G8 | Optional: AgenticBTC compatibility review (v1≠v2, resource URL) | **ADDRESSED** — canonical v2 URL shipped Day 35; no new BK inbound since 2026-10-06 |
| G9 | Settle proxy allows the live network | **BLOCKED** — `demo/api/_settle.js` allowlist + requirements are still Base Sepolia only (`base-sepolia` / `eip155:84532`); a mainnet payment would get `network_not_allowed`. Needs a separate reviewed code PR (allow `eip155:8453`, build requirements from the live v2 accept) before any flip |

**Ready to flip live settle:** **No.** Needs G6 + G9 + an explicit Galaxy Mind yes + a dedicated Day step that sets `X402_SETTLE=1`. Not today.

## Explicit non-goals today (Day 42)

- No production `X402_SETTLE=1` (do not touch env)  
- No code change or Vercel redeploy — docs only  
- Arena already submitted (project 13731, 2026-10-10, entered for judging) — no re-submit  
- No cold AgentMail spray; no live AgentMail send this run  
- No wallet signing; no Galaxy Mind spend  
- No Capital inflation from listings, test payments, or 402 challenges — Capital stays **$0 / $100**

## Next Capability slice (when Galaxy Mind says yes)

1. Code PR for G9: settle allowlist + requirements follow the live v2 accept (`eip155:8453`), still behind `X402_SETTLE`.  
2. G6: fund a separate test client with a small amount of Base USDC (Galaxy Mind yes required; not Capital).  
3. One gated settle against `/api/paid-brief` (v2), then turn settle back off unless the yes covers staying on.  
4. Log the tx hash + `PAYMENT-RESPONSE` in `intel/`; bump Capability only after a real settle. x402scan tx count should go from 0 → 1.

## Evidence

- `intel/live-day42-2026-10-12.json` (health, 402, OpenAPI, well-known, x402scan, balances)  
- `intel/payai-supported-2026-10-12.json`  
- `intel/live-mainnet-2026-10-08.json` · `intel/live-mainnet-ready-2026-10-08.json`  
- [`v2_canonical.md`](./v2_canonical.md) · [`x402scan.md`](./x402scan.md) · [`facilitator_wire.md`](./facilitator_wire.md)
