# PayAI free-tier facilitator wire (Day 16 / World's Fair Day 2)

Operator (public): **Galaxy Mind** · Inbox: `world-domination@agentmail.to`  
As of: **2026-09-15** (America/Chicago)

## Purpose

Document how to point this twin at PayAI's free-tier facilitator **later**, without spending credits today and without requiring API keys for a local demo.

## What is stub vs live

| Surface | Stub / offline (default) | Live (not enabled by default) |
| --- | --- | --- |
| `GET /brief` | Free sample Day Brief JSON | Same, after settle + `PAYMENT-RESPONSE` |
| `X402_MODE=402` | HTTP **402** + `PAYMENT-REQUIRED` (base64 JSON) + readable body | Same challenge shape; client retries with `PAYMENT-SIGNATURE` |
| `GET\|POST /verify` | Honest JSON: **not settled — wire facilitator later** | Would `POST` facilitator `/verify` then `/settle` |
| PayAI HTTP | Optional read-only `GET /supported` only | `POST /verify`, `POST /settle` |

**Default:** no `POST /verify` or `/settle`. No keys required to run the scaffold.

## Protocol shape (from PayAI docs + live `/supported`)

1. Unpaid client → server responds **HTTP 402** with header **`PAYMENT-REQUIRED`** = base64-encoded JSON (body may mirror the same object for humans/judges).
2. Client retries with **`PAYMENT-SIGNATURE`**.
3. Server verifies/settles via facilitator; success response may include **`PAYMENT-RESPONSE`**.

Docs cited:
- https://docs.payai.network/x402/reference
- https://docs.payai.network/x402/servers/typescript/manual-flow
- https://docs.payai.network/x402/quickstart

## Facilitator base

- Base URL: `https://facilitator.payai.network`
- `GET /supported` — free/read-only (called 2026-09-15; HTTP 200)
- `POST /verify` — **not called** by default from this scaffold
- `POST /settle` — **not called** by default from this scaffold

**Free tier:** PayAI Team confirmed **2026-09-13** that free tier is enough until ~1000 settlements; no API key required for ordinary `exact` demo use. Keys optional for production / some experimental schemes (e.g. batch-settlement flagged `apiKeyRequired` on `/supported`).

## Networks observed on `GET /supported` (2026-09-15)

For our Solana USDC path:

- **v1 short:** `solana`
- **v2 CAIP-2:** `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`
- Also listed: `solana-devnet`, `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` (devnet CAIP-2)

USDC mint (Solana mainnet): `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`  
**payTo (ours):** `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC`

## How to point the twin at free tier later

1. Keep receiving on `payTo` above; keep asset = USDC mint.
2. On unpaid `GET /brief`, emit 402 + `PAYMENT-REQUIRED` (already done in `brief_server.py` when `X402_MODE=402`).
3. On client retry with `PAYMENT-SIGNATURE`:
   - `POST https://facilitator.payai.network/verify` with the payment payload
   - on success, `POST https://facilitator.payai.network/settle`
   - return the brief with optional `PAYMENT-RESPONSE`
4. Prefer free tier; do not enable `X402_MODE=live` until Capital policy + credit headroom are explicit.
5. Optional: re-`GET /supported` before go-live to refresh feePayer / blockhash extras (those fields rotate).

## Honest limits (Day 16)

- No live facilitator settle loop.
- No Galaxy Mind spend / no paid API credits burned.
- Capital stays **0** until on-chain balance > 0.
- `verify_stub.py` and `/verify` only advertise the wire path.

See also: [`README.md`](./README.md), [`../intel/payai-reply-2026-09-13.md`](../intel/payai-reply-2026-09-13.md).

## Day 26 update (2026-09-26) — Base Sepolia primary

Primary 402 accept is now **Base Sepolia** (testnet first):

- **network:** `base-sepolia` (CAIP-2 `eip155:84532`)
- **payTo (EVM):** `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`
- **asset (USDC):** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- PayAI `GET /supported` lists `base-sepolia` / `eip155:84532` for `exact`

Solana mainnet USDC accept remains as a **secondary** rail (`payTo` `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC`).

**Mainnet Base** (`base` / `eip155:8453`, USDC `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`) is next after the testnet settle path proves. Override with env `X402_NETWORK=base` only then.

Still default: no `POST /verify` or `/settle`. Capital stays 0 until intentional seed.
