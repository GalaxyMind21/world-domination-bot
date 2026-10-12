# Day 42 — HQ docs aligned to live Base mainnet (2026-10-12 CT)

**Step:** fix_stale_hq_mainnet_truth — docs only.

## Files changed (identical in war room `/workspace/world-domination/` and HQ clone)
- `RAISE.md` — Base line: live x402 v2 primary rail is **Base mainnet USDC** → `0xD843…44C9`; settle kill-switch off; legacy v1 Sepolia deprecated; status shows Capital $0/$100 (Base 0, Solana 0)
- `x402/discovery.md` — OpenAPI `eip155:8453`, `testnet: false`; x402scan listing; legacy v1 deprecated; discovery ≠ Capital
- `x402/settle_readiness.md` — Day-42 mainnet-aware checklist (G1/G2/G3/G5/G7 PASS, G4 shipped off, G6 BLOCKED mainnet funded test, **new G9 BLOCKED**: `demo/api/_settle.js` allowlist + requirements still Base Sepolia only → mainnet settle needs a separate code PR before any flip)
- New evidence: `intel/payai-supported-2026-10-12.json` (PayAI `/supported`: `exact` on `eip155:8453` v2 + `base` v1); HQ also got `intel/live-day42-2026-10-12.json`
- `DEMO.md` — **unchanged**: it never claims Sepolia is the live paid rail (it demos the local Python twin + Solana USDC header). Stale vs live `/api/paid-brief` but outside this step's scope.
- `STATUS.md` / `README.md` — untouched (render_board.py output; parent refreshes after state.json)

## HQ
- PR: https://github.com/GalaxyMind21/world-domination-bot/pull/36 — **MERGED** 2026-10-12 9:15 AM CT
- Commit: `cd09d13` · merge SHA `aad83a7bbebcdf9f595cc5c8027d4414d0336dcc`
- No CI checks configured on the repo; merge state was CLEAN

## Live product unchanged
- No code, env, `X402_SETTLE`, wallet, or Vercel deploy change
- Post-merge check: `/api/health` → `eip155:8453`, `settle_live=false`; `/api/paid-brief` → 402
- Capital $0 / $100
