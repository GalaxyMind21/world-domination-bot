# G6 test-client unlock playbook (Day 33)

Operator (public): **Galaxy Mind** · Inbox: `world-domination@agentmail.to`  
As of: **2026-10-03** (America/Chicago)

## Purpose

Unlock gate **G6** (Base Sepolia testnet client with gas + USDC) so a later Day can flip `X402_SETTLE=1` for one gated testnet settle — without spending Galaxy Mind operating money and without enabling live settle today.

Companion dry-run harness: [`g6_dry_run_client.mjs`](./g6_dry_run_client.mjs) (default dry-run; no keys required).

## What G6 needs

A **test wallet** (throwaway / burner is fine) on **Base Sepolia** (chain ID **84532**) that holds:

1. **Base Sepolia ETH** — gas for any EIP-3009 / transfer-related steps the client wallet performs  
2. **Base Sepolia USDC** — at least **1.00 USDC** for the live challenge (`maxAmountRequired` = `1000000` atomic units)

Live challenge fields (re-verified 2026-10-03):

| Field | Value |
| --- | --- |
| URL | `https://world-domination-x402.vercel.app/api/brief?mode=402` |
| network | `base-sepolia` (`eip155:84532`) |
| payTo | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` |
| asset (USDC) | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| amount | `1.00 USDC` (`1000000`) |
| facilitator | `https://facilitator.payai.network` |

**Must match asset** `0x036CbD53842c5426634e7929541eC2318f3dCF7e` — do not use a different Sepolia USDC contract.

## Free faucet options (public, researched 2026-10-03)

### Base Sepolia ETH (gas)

| Faucet | URL | Notes |
| --- | --- | --- |
| QuickNode | https://faucet.quicknode.com/base/sepolia | Base drip; no account / no mainnet balance required for base drip; ~12h cooldown |
| ETHGlobal | https://ethglobal.com/faucet | Lists Base Sepolia ~0.05 ETH |
| Base docs (CDP + ecosystem) | https://docs.base.org/base-chain/network-information/network-faucets | CDP faucet up to ~0.1 ETH/24h; Ethereum Ecosystem faucet also listed |

### Base Sepolia USDC (challenge amount)

| Faucet | URL | Notes |
| --- | --- | --- |
| Circle public faucet | https://faucet.circle.com/ | Select **Base Sepolia**, request **USDC** (~20 USDC / 2h per address per chain per Circle public docs). Confirms contract `0x036CbD…` |

Faucet UIs change; if a link 404s, use Base docs faucet index above and Circle’s faucet home — do not invent alternate contracts.

## Explicit policy

- **Testnet only.** Sepolia ETH / Sepolia USDC **never** count as Capital toward the **$100** operating target.
- **Do not spend Galaxy Mind operating money** on mainnet gas, paid faucet boosts, or mainnet USDC for this gate.
- **Ask Galaxy Mind before any real (mainnet / operating) spend.**
- Leave production **`X402_SETTLE` unset / `0`** until after one successful gated testnet settle **and** an explicit Day step that flips it.
- Dry-run client default is **no sign / no facilitator POST**. Live client path only with `G6_LIVE=1` **and** a key present in env (never commit keys).

## Suggested test receive/pay flow

1. Create or select a burner EVM wallet; switch network to Base Sepolia (84532).  
2. Claim **ETH** from a faucet in the table above.  
3. Claim **USDC** from https://faucet.circle.com/ (Base Sepolia) — confirm balance of asset `0x036CbD…`.  
4. Run dry-run first: `node x402/g6_dry_run_client.mjs` — prints health + `accepts[0]` fields; does not sign.  
5. Only when funded and ready for a gated Day: set env for live client mode (`G6_LIVE=1` + private key via env, never files in git) and follow PayAI x402 client docs to build `PAYMENT-SIGNATURE` for the exact accept.  
6. Retry `GET /api/brief?mode=402` with `PAYMENT-SIGNATURE`.  
7. **Server side:** production still returns stub unless `X402_SETTLE=1`. Flip that kill-switch only on a gated Day after G6 funds exist — prefer a preview/non-prod env for the first settle if available.  
8. Log receipt / evidence under `intel/` and bump Capability only after a real settle.

Docs: https://docs.payai.network/x402/reference · https://docs.payai.network/x402/servers/typescript/manual-flow

## Kill-switch reminder

| Env | Meaning |
| --- | --- |
| `X402_SETTLE` unset / `0` | **Default.** Live demo does not POST facilitator `/verify` or `/settle`. |
| `X402_SETTLE=1` | Allows settle path on Base Sepolia only — **do not set on production until G6 + explicit Day step.** |
| `G6_LIVE` unset / `0` | Dry-run client: fetch + print only. |
| `G6_LIVE=1` + key | Client may sign (still separate from production settle kill-switch). |

## Status Day 33

| Gate | Status |
| --- | --- |
| G4 kill-switch code | **SHIPPED** (default off) |
| G6 test client funded | **BLOCKED** — playbook + dry-run harness shipped; wallet not yet faucet-funded |
| Live settle | **OFF** |

## Evidence

- `intel/live-demo-2026-10-03.json`  
- `intel/payai-supported-2026-10-03.json`  
- [`settle_readiness.md`](./settle_readiness.md) · [`g6_dry_run_client.mjs`](./g6_dry_run_client.mjs)
