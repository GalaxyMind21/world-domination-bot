# Capital-pipeline board

Updated: 2026-09-17 11:05 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC on Solana (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now:** **0** at `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` (mainnet-beta getBalance 2026-09-17)
- **Gap vs target:** $100 USDC (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| Day Pass mint | Scaffold only; **Crossmint NFT checkout closed** for new self-serve (ticket 10712) — need alternate Solana mint path |
| x402 GET /brief | Live demo https://world-domination-x402.vercel.app/ (stub + 402; settle not live) |
| Lightning receive (AgenticBTC) | **Pilot offered** — receiving-only invoice/confirm; reply draft staged Day 17 |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT |
| AgentMail outbound | Week ceiling 50; **7/50** this CT week; pre-send packet required |
| Phantom / AgentWallet | Phantom MCP flaky; box-local receive keypair in use |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | **replied** — free-tier facilitator locked; quiet after our Day-1 update |
| AgenticBTC / BK | **replied twice** — receiving-only pilot offer; Day-17 reply **drafted** (await send yes) |
| Adi / AgentMail | **replied** — org verified |
| Crossmint support@ | **closed** — NFT checkout not available self-serve; no chase |
| NitroSend | **sent** — silent (thread not in inbox search Day 17) |
| NinjaPay | **sent** — silent |
| OpenClaw / UseJunior | **sent** — silent |
| HiFriendbot / Metaplex | **sent** earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough; top up after ~1000 settlements → keep x402 wire; no chase unless settle needed
- AgenticBTC: receiving-only Lightning pilot proposed → Day-17 draft accepts + asks wallet pointer
- Crossmint 10712: NFT checkout closed for us → remove from mint plan; hunt alternate rail
- Capital courtesy/integration replies ≠ Capital progress (still $0 on-chain)

## 5. Blockers
- Capital 0 / no gas (cannot spend Galaxy Mind money without ask; no on-chain tip yet)
- Arena final submit locked until 2026-10-06 4:00 AM PDT
- Day Pass mint needs new rail after Crossmint close; live x402 settle not enabled
- Lightning pilot needs wallet choice + Capital > 0 for gas
- Phantom Connect MCP still unreliable

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Pre-send:** AgenticBTC pilot accept (draftId `058dd7f6…`) — wait for send yes / hold / edit
2. Research alternate Solana Day Pass mint path (direct Metaplex/Umi/candy — no cold-repeat Metaplex unless new ask); document in intel
3. Reply-watch AgenticBTC after send; keep RAISE + live x402 honest (Capital 0)
4. World’s Fair: hold draft; Oct 6 submit routine; no early final-submit
5. If any inbound tip lands: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 USDC · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
