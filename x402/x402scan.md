# x402scan listing (Day 38)

Tried to register `https://world-domination-x402.vercel.app` via x402scan **Add your API** (`/resources/register`) on 2026-10-08.

Discovery worked (OpenAPI found, `/api/health` correctly free, `/api/paid-brief` probed and returned 402), but registration was refused:

> No supported networks. Got: [base_sepolia]. Supported: [base, solana]

So the button stayed at "0 valid resources". x402scan only indexes Base mainnet and Solana; a Base Sepolia resource cannot be listed.

## Mainnet-ready switch (default off)

`demo/api/_v2.js` now reads `X402_V2_NETWORK`:

| Env | Canonical accept | x402scan |
| --- | --- | --- |
| unset (default) | `eip155:84532` Base Sepolia USDC `0x036C…CF7e` | refused |
| `X402_V2_NETWORK=base` | `eip155:8453` Base USDC `0x8335…2913` | should index |

payTo stays `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`. OpenAPI `testnet`, well-known instructions and `/api/health` follow the active network. Cross-network payloads are rejected (`network_mismatch`) before any facilitator call. PayAI `/supported` lists x402 v2 `exact` on `eip155:8453`.

Settlement remains a separate switch (`X402_SETTLE=1`). Going live on mainnet is two operator decisions: list on mainnet (accept advertised, settle still off) and later turn settle on. Neither is flipped without an explicit yes from Galaxy Mind.

Test: `node test/smoke_mainnet.mjs` (no network).

## Mainnet flip (Day 38, 2026-10-08 ~9:50 CT)

Galaxy Mind said yes. Production now has `X402_V2_NETWORK=base` (`X402_SETTLE` unset). Deploy `dpl_FcC196f7So2f3jvo5xn6GdJbegjx`. Live 402 accepts `eip155:8453` Base USDC → `0xD843…44C9`; settle_live false.

x402scan preview re-run (no wallet): **Add API (2 resources)**, both `/api/health` and `/api/paid-brief` valid. Not registered yet.

Registering = clicking **Add API**: x402scan's `registerFromOrigin` is a public tRPC procedure, no wallet sign-in. (The programmatic registration API and the optional "verified owner" badge are the parts that need a wallet signature.)
