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
| `assets/daypass.png` | Durable Day Pass art (GitHub raw after HQ merge) |
| `assets/daypass.svg` | Vector twin of the same mark |
| `scripts/verify-metadata-uris.mjs` | Local + remote metadata/image URI check (`npm run verify-metadata-uris`) |

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

## Underdog Protocol REST fallback (devnet)

Primary rail remains **Metaplex Core Candy Machine + Umi** (this folder). If public Solana faucet stays dry or Core CM create is blocked, the next free agent-friendly path is **Underdog Protocol** on **devnet only** (see `../intel/alt-solana-daypass-mint-2026-09-17.md`).

| Item | Note |
| --- | --- |
| Why | Bearer REST mint (`POST /v2/projects`, `POST .../nfts`); no browser wallet UI for authority mint |
| Cost | **Devnet free** with dashboard API key; **mainnet needs paid subscription** — NO-GO until Capital > 0 and Galaxy Mind go |
| Docs | https://docs.underdogprotocol.com/ · https://docs.underdogprotocol.com/quickstart · https://underdog.readme.io/reference/post_v2-projects-t-projectid-nfts |
| Secrets | API key stays box-local under `~/.config/world-domination-wallet/` — never commit |
| Status | Key **not** provisioned yet; do not invent Capital from polite emails |

### Underdog REST client scaffold (devnet fallback)

Primary rail remains Core CM. When faucet is dry, use the local REST client (no paid plan; no Galaxy Mind spend):

```bash
npm run underdog-dry-run      # validates Day Pass payloads; writes out/underdog-dry-run.json
npm run underdog-probe       # docs + base URL reachability (no auth)
npm run create-cm-readiness  # reusable Core CM blocker report → out/create-cm-readiness.json
```

Live Underdog mint only after a **free** dashboard API key is saved chmod 600 at `~/.config/world-domination-wallet/underdog-devnet-api-key.txt`, then:

```bash
npm run underdog-create-project -- --confirm
UNDERDOG_PROJECT_ID=<id> npm run underdog-mint-one -- --confirm
```

Mainnet Underdog subscription = **NO-GO** until Capital > 0.

### One-command ship when funded (Day 22)

When the faucet is dry, rehearse the full create+mint shape without SOL:

```bash
npm run ship-devnet-simulate   # validates live metadata URIs; writes out/*.simulated.json + ship-devnet-plan.json
```

The moment `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` has ≥ ~0.05 SOL on **devnet**:

```bash
npm run ship-devnet-when-funded   # create-cm-devnet then mint-one-devnet (or mint-one if CM already exists)
```

Simulated artifacts are **not** on-chain. Live addresses land in `out/devnet-addresses.json` (gitignored). CI: always run `ship-devnet-simulate`; only run live when a funded disposable keypair is injected (never commit keypairs).

### Dry-run (no chain, no spend)

```bash
npm run verify-dry-run
```

Validates metadata, scripts, deps, disposable pubkey presence, and remote metadata URIs. Does **not** airdrop, create, or mint.

### Unblock Core CM path

Fund disposable pubkey `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` via https://faucet.solana.com/ (or any public free faucet), then:

```bash
npm run airdrop-devnet   # if RPC faucet recovers
npm run create-cm-devnet
npm run mint-one-devnet
```

Record collection / candyMachine / asset / txs in `../intel/core-cm-devnet-YYYY-MM-DD.md`.
