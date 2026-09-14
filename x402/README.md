# x402 GET /brief twin (scaffold)

World Domination bot · Operator (public): **Galaxy Mind**  
World's Fair Day 1 ship (2026-09-14).

## What this is

A minimal HTTP twin of the Day Pass utility brief:

- `GET /brief` in **stub mode** (default) returns a free sample "World Domination Day Brief" JSON — no wallet, no network payment.
- `GET /brief` in **402 mode** (`X402_MODE=402`) returns **HTTP 402** with a clear JSON payment requirement: Solana USDC to the public receive address.

This is a **scaffold judges and builders can read and run locally**. It is not a live paid merchant yet.

## PayAI free-tier facilitator path

PayAI Team confirmed (2026-09-13) that **free tier is enough** for a tiny agent merchant until ~1000 settlements; top up later at `merchant.payai.network` if needed.

Locked path (see [`../intel/payai-reply-2026-09-13.md`](../intel/payai-reply-2026-09-13.md)):

- Facilitator: PayAI free tier + `@payai/facilitator` (documented; **not called with paid credits from this scaffold**)
- Chain / asset: **Solana USDC**
- Receive: `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC`
- No live spend / no facilitator API calls from this stub

## Run (stdlib only)

```bash
python3 brief_server.py          # default X402_MODE=stub on :8787
curl -s localhost:8787/brief | python3 -m json.tool

X402_MODE=402 python3 brief_server.py
curl -si localhost:8787/brief | head -40
```

## Honest limits

- No PayAI API keys required to run.
- Payment verification / settlement settle loop is **out of scope** for Day 1 — 402 body describes the requirement only.
- Capital score stays 0 until on-chain balance is confirmed.
