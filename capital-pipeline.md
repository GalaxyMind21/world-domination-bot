# Capital-pipeline board

Updated: 2026-09-30 08:45 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-09-30)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet dust ETH — **does not inflate Capital score** until intentional seed toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-28 redeploy; Day-30 health re-verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 GET /brief | **Live alias Base Sepolia primary** → EVM receive. Solana secondary. Settle not live. Day-30 **settle_readiness** checklist shipped (kill-switch + Sepolia test client still gated). |
| Lightning receive (AgenticBTC / BK) | Day-27 decline SENT; Day-29 clarify **SENT** (msgCount 14); **awaiting free Base/x402 cost/test-plan packet** — no NEW inbound Day 30 |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — hold |
| AgentMail outbound | CT week **2026-09-28**; **1/50**; Day 30 no new draft/send |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4); /supported re-checked Day 30 |
| AgenticBTC / BK | Decline SENT Day 27; clarify SENT Day 29; waiting free packet (msgCount 14) |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; settle readiness documented; no chase unless settle needed
- AgenticBTC: clarify delivered Day 29 (GET `/api/brief` + Vercel demo/ Base Sepolia stack). **Watching for free packet.** No new draft Day 30.
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- AgenticBTC free cost/test-plan packet not yet inbound
- Arena final submit locked until 2026-10-06 4:00 AM PDT
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live (kill-switch + Sepolia test client gated — see `x402/settle_readiness.md`)
- Lightning: free packet outstanding; any later paid work needs SOW + separate Galaxy Mind yes

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Reply-watch:** AgenticBTC thread `52b712a8` for free Base/x402 cost/test-plan packet; PayAI stays quiet unless settle ping needed
2. If free packet arrives: stage AgentMail reply draft + pre-send under `intel/` — **do not send** until send yes
3. **Settle path:** when Capability slot opens, ship `X402_SETTLE` kill-switch on `demo/api` without flipping live settle (see settle_readiness gates G4/G6)
4. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
5. World’s Fair: hold draft; Oct 6 submit routine; no early final-submit
6. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
