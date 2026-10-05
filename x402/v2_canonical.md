# x402 v2 canonical paid resource (Day 35, 2026-10-05)

**Canonical paid URL:** `https://world-domination-x402.vercel.app/api/paid-brief`

The URL that challenges is the URL that serves the paid brief, and `PaymentRequired.resource.url` names exactly that URL. This closes the two contract gaps found in a no-cost third-party compatibility review (v1 vs v2, and `?mode=402` vs `resource: /api/brief`).

## Challenge (unpaid GET → 402)
`PAYMENT-REQUIRED` header, base64 of:
```json
{
  "x402Version": 2,
  "error": "PAYMENT-SIGNATURE header is required",
  "resource": {
    "url": "https://world-domination-x402.vercel.app/api/paid-brief",
    "description": "World Domination Day Brief (paid, x402 v2, Base Sepolia USDC)",
    "mimeType": "application/json"
  },
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:84532",
    "amount": "1000000",
    "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    "payTo": "0xD8436B7afD09E10704931E17FBC79dE71BF944C9",
    "maxTimeoutSeconds": 60,
    "extra": { "name": "USDC", "version": "2" }
  }],
  "extensions": { "wd-receipt-binding": { "info": { "...": "see below" } } }
}
```
Only Base Sepolia is offered on v2. The Solana secondary rail stays on the legacy v1 challenge only.

## Paid retry
Client sends `PAYMENT-SIGNATURE` (base64 v2 `PaymentPayload`). The server:
1. Rejects before any facilitator call unless `x402Version == 2` and `accepted` equals the challenge on scheme, network, amount, asset, and payTo (case-insensitive addresses), `resource.url` (if sent) equals the canonical URL, and `authorization.to` / `authorization.value` match. Requirements are server-authoritative; client-supplied payTo is never adopted.
2. With `X402_SETTLE=1` only: POST PayAI `/verify` then `/settle` with `{ x402Version: 2, paymentPayload, paymentRequirements }`. PayAI `/supported` lists `x402Version 2 / exact / eip155:84532` (evidence 2026-10-05).
3. On success: HTTP 200, `PAYMENT-RESPONSE` header (base64 `{ success, transaction, network: "eip155:84532", payer }`), body includes `receipt`.

## Idempotency and receipt binding (`wd-receipt-binding` extension)
- **Idempotency key:** `payload.authorization.nonce` (EIP-3009 nonce; replay is rejected on-chain by the USDC contract).
- **Receipt id:** `sha256(resource.url | accepted.network | accepted.asset | accepted.payTo | accepted.amount | nonce)`, lowercase addresses and nonce. Same paid request gives the same id.
- **Bound fields:** `resource.url`, `accepted.network`, `accepted.asset`, `accepted.payTo`, `accepted.amount`, `payload.authorization.nonce`; the receipt also carries `transaction`.

## Honesty
- Production kill-switch is still **off** (`X402_SETTLE` unset). With it off, a signed retry gets 402 with `settle_attempt.status = kill_switch_off` and no facilitator call.
- No live on-chain receipt exists yet; the first one needs a funded Base Sepolia test client (G6). Testnet is not operating Capital.
- Legacy `GET /api/brief?mode=402` (v1) remains for back-compat, now names its own URL as `resource`, sends `Link: <…/api/paid-brief>; rel="canonical"`, and is marked deprecated.

Spec: https://github.com/coinbase/x402/blob/main/specs/x402-specification-v2.md
