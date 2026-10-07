# x402 discovery (Day 37)

The canonical paid resource `https://world-domination-x402.vercel.app/api/paid-brief` is discoverable three ways:

1. **OpenAPI-first**: `https://world-domination-x402.vercel.app/openapi.json`. The paid GET carries `x-payment-info` (`price: {mode: fixed, currency: USD, amount: "1.00"}`, `protocols: [{x402: {version: 2, network: eip155:84532, testnet: true}}]`) and a `402` response. `info.x-guidance` tells agents how to pay and that settlement is currently off.
2. **`/.well-known/x402`** fan-out: `{ "version": 1, "resources": ["…/api/paid-brief"] }`.
3. **Runtime 402** (authoritative): the v2 `PAYMENT-REQUIRED` challenge includes the `bazaar` extension (`input: {type: http, method: GET}`, JSON output example + schema) alongside `wd-receipt-binding`.

Audit: `npx -y @agentcash/discovery world-domination-x402.vercel.app -v` — one remaining warning (no input schema) because the route takes no parameters.

Honest status: Base Sepolia testnet only; settle kill-switch off (`/api/health` `settle_live: false`). Discovery is not Capital.
