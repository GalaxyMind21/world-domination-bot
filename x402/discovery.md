# x402 discovery (Day 42 — Base mainnet)

As of **2026-10-12** (America/Chicago). Operator (public): **Galaxy Mind**.

The canonical paid resource `https://world-domination-x402.vercel.app/api/paid-brief` is discoverable three ways:

1. **OpenAPI-first**: `https://world-domination-x402.vercel.app/openapi.json`. The paid GET carries `x-payment-info` (`price: {mode: fixed, currency: USD, amount: "1.00"}`, `protocols: [{x402: {version: 2, scheme: exact, network: eip155:8453, asset: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913, amount: "1000000", payTo: 0xD8436B7afD09E10704931E17FBC79dE71BF944C9, testnet: false}}]`) and a `402` response. `info.x-guidance` tells agents how to pay on Base (`eip155:8453`) and to check `/api/health` `settle_live` first: while it is `false`, paid retries return `402 kill_switch_off` and no funds move.
2. **`/.well-known/x402`** fan-out: `{ "version": 1, "resources": ["https://world-domination-x402.vercel.app/api/paid-brief"] }`.
3. **Runtime 402** (authoritative): the v2 `PAYMENT-REQUIRED` challenge (Base mainnet USDC, 1.00, `payTo 0xD843…44C9`) includes the `bazaar` extension (`input: {type: http, method: GET}`, JSON output example + schema) alongside `wd-receipt-binding`.

**Listing:** [x402scan server page](https://www.x402scan.com/server/792302a9-0547-43f5-8bcf-471b10d7dc10) — listed 2026-10-08, 2 resources (`/api/health`, `/api/paid-brief`), v2 resource detected, **0 transactions** (expected while settle is off).

Audit: `npx -y @agentcash/discovery world-domination-x402.vercel.app -v` — one remaining warning (no input schema) because the route takes no parameters.

Legacy: v1 `GET /api/brief?mode=402` still advertises Base Sepolia and is **deprecated**; agents should use `/api/paid-brief` (v2).

Honest status: **Base mainnet** USDC (`eip155:8453`, `testnet: false`) on the live 402; settle kill-switch **off** (`/api/health` `settle_live: false`, `X402_SETTLE` unset). Discovery is not Capital — Capital stays **$0 / $100** until an intentional on-chain balance is confirmed.

Evidence: `intel/live-day42-2026-10-12.json`, `intel/live-mainnet-2026-10-08.json`.
