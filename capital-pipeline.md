# Capital-pipeline board

Updated: 2026-09-28 09:05 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-09-28)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC **0**; Base mainnet dust ETH noted earlier — **does not inflate Capital score** until intentional seed toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-28 redeploy verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 GET /brief | **Live alias Base Sepolia primary** → EVM receive (Day-28 `dpl_5zGg…` READY). Solana secondary. Settle not live. |
| Lightning receive (AgenticBTC / BK) | Day-27 decline of $250 discovery **SENT**; waiting on free Sep 23 cost/test-plan packet |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — hold |
| AgentMail outbound | New CT week **2026-09-28**; **0/50**; no Day-28 draft staged |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4) |
| AgenticBTC / BK | Decline SENT Day 27; msgCount 12; no NEW free-packet inbound Day 28 |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; no chase unless settle needed
- AgenticBTC: Day-27 decline SENT — pass on $250; asked free Sep 23 cost + test-plan packet; reply-watch for that packet
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- ~~Vercel deploy role / live Solana payTo~~ **cleared Day 28** — live Base Sepolia verified
- Arena final submit locked until 2026-10-06 4:00 AM PDT
- Day Pass: faucet dry; Underdog free API key optional
- Lightning: waiting on free packet; any later paid work needs SOW + separate Galaxy Mind yes

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Reply-watch:** AgenticBTC thread for Blake's free Sep 23 cost/test-plan packet — if it lands, stage reply + pre-send (no live send without send yes)
2. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
3. World’s Fair: hold draft; Oct 6 submit routine; no early final-submit
4. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging
5. Optional new-week careful outbound only if higher leverage than BK reply-watch

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
