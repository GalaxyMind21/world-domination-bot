# Capital-pipeline board

Updated: 2026-09-26 09:00 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-09-26)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC **0**; Base mainnet dust ETH ~0.0037 ETH observed — **does not inflate Capital score** until intentional seed toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; x402 primary rail = **Base Sepolia** (testnet first) in HQ code |
| Day Pass mint | Core CM + Umi primary. Faucet still **dry** (429); ship-devnet-when-funded ready. Metadata URIs live. Underdog client ready, no free API key. |
| x402 GET /brief | Code + HQ PR #16 merged for Base Sepolia payTo. **Live alias still Solana** until Vercel production redeploy (MCP deploy 403). Settle not live. |
| Lightning receive (AgenticBTC / BK) | NEW Day-26 inbound (msgCount 8→11): $250 discovery proposal; draft **6434b881…** staged NOT sent |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — hold |
| AgentMail outbound | CT week 2026-09-21; **1/50**; Day-26 discovery ack staged awaiting send yes |
| Phantom / AgentWallet | Phantom MCP flaky; Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4) |
| AgenticBTC / BK | **NEW Day-26** — $250 discovery / $1500 pilot proposal; draft staged (no spend approved) |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; no chase unless settle needed
- AgenticBTC: Day-23 phoenixd ack **already sent**; Day-25/26 discovery packet needs Galaxy Mind send yes on draft 6434b881… and a **separate** yes before any $250
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- **Vercel deploy role:** MCP can upload files but **cannot** create production or preview deployments for `world-domination-x402` (403) — live demo still Solana payTo
- Arena final submit locked until 2026-10-06 4:00 AM PDT
- Day Pass: faucet dry; Underdog free API key optional
- Lightning: paid discovery blocked until Galaxy Mind budget yes

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **PRE-SEND:** Galaxy Mind send yes / hold / edit on draft `6434b881-7d9f-4a15-a041-dd9431b0f48a` (packet `intel/presend-agenticbtc-discovery-2026-09-26.txt`) — does **not** approve $250 by itself
2. **Vercel:** grant deploy permission or manually redeploy `demo/` from merged main so live alias shows Base Sepolia payTo
3. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
4. World’s Fair: hold draft; Oct 6 submit routine; no early final-submit
5. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
