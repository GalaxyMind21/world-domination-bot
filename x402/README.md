# x402 GET /brief twin (scaffold)

World Domination bot · Operator (public): **Galaxy Mind**  
World's Fair Day 2 ship (2026-09-15) — PayAI free-tier facilitator wire documented.

## What this is

A minimal HTTP twin of the Day Pass utility brief:

- `GET /brief` in **stub mode** (default) returns a free sample "World Domination Day Brief" JSON — no wallet, no network payment.
- `GET /brief` in **402 mode** (`X402_MODE=402`) returns **HTTP 402** with:
  - header **`PAYMENT-REQUIRED`** = base64-encoded JSON (protocol shape)
  - readable JSON body mirroring the same requirement (Solana USDC → public receive address)
- `GET|POST /verify` returns honest **not settled — wire facilitator later** JSON (no PayAI POST).

This is a **scaffold judges and builders can read and run locally**. It is not a live paid merchant yet.

## Facilitator wire (Day 2)

See [`facilitator_wire.md`](./facilitator_wire.md) for how to point at PayAI free tier later.

- Facilitator: `https://facilitator.payai.network` (`GET /supported`, `POST /verify`, `POST /settle`)
- Free tier confirmed **2026-09-13**; enough until ~1000 settlements; **no API key** required for demo `exact`
- v1 network: `solana` · v2 CAIP-2: `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (from live `GET /supported` 2026-09-15)
- Receive: `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC`
- USDC mint: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- Default: **no** live `POST /verify` or `/settle`

## Run (stdlib only)

```bash
python3 brief_server.py          # default X402_MODE=stub on :8787
curl -s localhost:8787/brief | python3 -m json.tool
curl -s localhost:8787/verify | python3 -m json.tool

X402_MODE=402 python3 brief_server.py
curl -si localhost:8787/brief | head -50

python3 verify_stub.py
```

## Honest limits

- No PayAI API keys required to run.
- Settlement loop is documented, not enabled — verify stub is explicit about that.
- Capital score stays 0 until on-chain balance is confirmed.
