# World Domination Day Pass — mint scaffold

Working name from `../nft-one-pager.md`. **Devnet scaffold live path below.** No private keys in this folder. **No mainnet. No Galaxy Mind spend.**

Operator (public): **Galaxy Mind**

## Spec (v1)
| Field | Value |
| --- | --- |
| Chain | Solana (**devnet** for this scaffold; mainnet blocked until Capital > 0) |
| Standard | Metaplex **Core** via Core Candy Machine + **Umi** |
| Supply | 100 |
| Price (TBD) | 0.05–0.1 SOL **or** ~$10–20 USDC (pick one after balances known; guards not set yet) |
| Utility | Email `world-domination@agentmail.to` subject `DAYPASS` → same-week status brief + next-step ask; opt-in `HOLDERS.md`; one free revision. **Not equity.** |
| Refund policy | State plainly on mint page before launch (default draft: no refunds after confirmed mint unless mint fails on-chain) |

## Go / no-go (copy from one-pager)
**GO** when all true:
1. Live Solana receive path + ≥$15 gas buffer
2. Public mint page (bot-owned domain or HQ section) with price, supply, utility, refund policy
3. Mint + verify scripts in HQ (forkable; no private keys in repo)
4. Soft-cap test: two-sentence reason someone pays

**NO-GO** for vibes-only mint, hidden fees, board inflation from mint theater, or **mainnet** deploy while Capital = 0.

## Files here
| Path | Purpose |
| --- | --- |
| `daypass-metadata.json` | Off-chain metadata for each Day Pass |
| `collection-metadata.json` | Off-chain metadata for the Core collection |
| `daypass-collection.md` | Public collection copy |
| `scripts/create-cm-devnet.mjs` | Create Core collection + Candy Machine (Hidden Settings, supply 100) |
| `scripts/mint-one-devnet.mjs` | `mintV1` one asset on devnet |
| `scripts/airdrop-devnet.mjs` | Public faucet airdrop to disposable keypair |
| `scripts/gen-keypair-devnet.mjs` | Generate disposable keypair under `~/.config/world-domination-wallet/` |
| `out/devnet-addresses.json` | Generated addresses/tx (gitignored locally; safe to paste pubkeys into intel) |
| `assets/` | Placeholder for image URI targets |

Crossmint self-serve checkout is **closed** — see `../intel/crossmint-nft-checkout-closed-2026-09-16.md`. Rail choice: `../intel/alt-solana-daypass-mint-2026-09-17.md`.

## Node
Use **Node ≥ 20** (box verified: Node 22). From this directory:

```bash
npm install
npm run gen-keypair-devnet   # once; writes ~/.config/world-domination-wallet/daypass-devnet-keypair.json (chmod 600)
npm run airdrop-devnet       # public Solana faucet / RPC airdrop only
npm run create-cm-devnet     # Core collection + Candy Machine
npm run mint-one-devnet      # mintV1 one Day Pass
```

Optional env:
- `SOLANA_RPC_URL` — default `https://api.devnet.solana.com`
- `DAYPASS_DEVNET_KEYPAIR` — override keypair path
- `DAYPASS_METADATA_URI` / `COLLECTION_METADATA_URI` — override metadata URIs
- `FORCE_NEW=1` — rotate keypair or create another CM
- `AIRDROP_SOL` — airdrop amount (default 2)

## Sequence (devnet)
1. Install deps (`npm install`) with Node ≥ 20
2. Generate disposable keypair (never commit; lives under `~/.config/world-domination-wallet/`)
3. Fund via **public faucet / RPC airdrop only**
4. `create-cm-devnet` → records collection + candy machine in `out/devnet-addresses.json`
5. `mint-one-devnet` → one `mintV1`; record asset + tx in intel
6. Mainnet / price guards / Solana Pay: **only after Capital > 0** and explicit go

## Secrets
- **NEVER** commit keypairs, `.env`, or `out/*.keypair.json`
- Disposable authority pubkey may be published; secret key stays box-local
- Do not reuse the mainnet receive keypair for mint authority experiments

## Soft-launch sequence (later)
1. Unstick Capital (`../capital-ledger.md`, `../capital-plan-100usdc.md`)
2. Host image + finalize metadata URI
3. Soft launch with pre-send packet to crypto/agent tooling only
4. If <5 mints in 14 days: pause, rewrite utility, or kill
