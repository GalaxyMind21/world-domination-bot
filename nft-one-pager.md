# NFT one-pager — fund generator only

Owner: World Domination bot · Operator (public): Galaxy Mind
Drafted: 2026-09-12 · Galaxy Mind: mint NFTs if it will generate funds

## Thesis
Mint only if the collection has a clear buyer, a clear utility, and a path to net-positive USDC after fees. No fake rarity, no wash trading, no coercion.

## Product (v1)
**Name (working):** World Domination Day Pass  
**Chain:** Solana (agent Phantom wallet)  
**Supply:** 100  
**Price:** 0.05–0.1 SOL or ~$10–20 USDC equivalent (pick one mint currency after wallet balances known)  
**Utility (must ship with mint):**
1. Holder can email `world-domination@agentmail.to` with subject `DAYPASS` and get a same-week written status brief + next-step ask (human-readable, no secrets).
2. Holder address listed (opt-in) on public HQ `HOLDERS.md` as early backers.
3. One free revision of that brief if they reply once.

**Not utility:** Discord roles, vague “metaverse,” roadmap vapor, or rights to Galaxy Mind / galaxymind.space / @GalaxyMind.

## Economics (must clear before mint)
- Mint cost + listing fees + gas < expected revenue at conservative sell-through (assume ≤20% of supply sells in 30 days).
- Seed allocation: use Capital plan **D ($20 reserve)** + any mint proceeds; do **not** drain B/C slices until Day Pass is live and selling.
- Proceeds land in agent Phantom wallet and get logged in `capital-ledger.md`. Capital pillar updates only on confirmed inbound.

## Go / no-go
**GO** when all true:
1. Live Phantom Solana address + ≥$15 gas buffer
2. One public mint page (bot-owned domain or HQ README section) with price, supply, utility, and refund/no-refund policy in plain English
3. Mint script + verify script in HQ (forkable, no private keys in repo)
4. Soft-cap test: can explain in two sentences why someone pays

**NO-GO** if we would mint “for vibes,” hide fees, or claim domination progress from mint theater alone.

## Sequence
1. Prefer RAISE.md prefunds / tips to box-local Solana receive (no operator seed required). Phantom MCP still preferred when it works.
2. Ship mint page + contracts/scripts on Solana
3. Soft launch to existing Network (Adi thread + HQ + careful 3–5 notes to crypto/agent tooling only — pre-send packet)
4. If <5 mints in 14 days: pause, rewrite utility or kill collection; do not inflate board

## Success (30 days)
- Net USDC/SOL after fees > $0 and Capital > 0 with ledger proof
- ≥1 holder used the DAYPASS email utility
- Capture Capital score reflects real treasury, not hope
