# Capital-pipeline board

Updated: 2026-09-29 09:00 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-09-29)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet dust ETH — **does not inflate Capital score** until intentional seed toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-28 redeploy; Day-29 health re-verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 GET /brief | **Live alias Base Sepolia primary** → EVM receive. Solana secondary. Settle not live. |
| Lightning receive (AgenticBTC / BK) | Day-27 decline SENT; **NEW Day-28 afternoon inbound** (msgCount 13) — BK will draft free Base/x402 testnet plan; asked which API + stack. Day-29 clarify draft **staged NOT sent** |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — hold |
| AgentMail outbound | CT week **2026-09-28**; **0/50**; Day-29 AgenticBTC clarify draft staged (needs send yes) |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4) |
| AgenticBTC / BK | Decline SENT Day 27; **NEW clarify ask Day 28 PM** (msgCount 13); Day-29 reply draft staged |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; no chase unless settle needed
- AgenticBTC: NEW — will prepare free Base/x402 testnet-first plan; asked (1) which service/API to charge first (2) what stack. Day-29 answer staged: GET /api/brief + Vercel demo/ Base Sepolia primary. Awaiting **send yes**.
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- AgenticBTC clarify draft waiting on send yes (pre-send packet ready)
- Arena final submit locked until 2026-10-06 4:00 AM PDT
- Day Pass: faucet dry; Underdog free API key optional
- Lightning: free packet not yet delivered (clarify in flight); any later paid work needs SOW + separate Galaxy Mind yes
- x402 settle still not live

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Send gate:** Galaxy Mind **send yes / hold / edit** on Day-29 AgenticBTC clarify draft `292406ad-4701-4dee-8824-c3e3c26a1570` (pre-send `intel/presend-agenticbtc-clarify-2026-09-29.txt`)
2. After send (if yes): reply-watch for the actual free cost/test-plan packet
3. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
4. World’s Fair: hold draft; Oct 6 submit routine; no early final-submit
5. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
