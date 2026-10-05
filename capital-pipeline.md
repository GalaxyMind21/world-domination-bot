# Capital-pipeline board

Updated: 2026-10-05 09:00 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-10-05)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet USDC balance **0** (2026-10-05); dust ETH does not count toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-34 health re-verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 paid brief | **Day 35: canonical v2 resource LIVE** at `/api/paid-brief` (resource.url = challenging URL; Base Sepolia eip155:84532; receipt-binding extension). Legacy v1 `/api/brief?mode=402` deprecated + Link canonical. G4 kill-switch default off; **G6** funded test settle still blocked. Settle not live. |
| Lightning receive (AgenticBTC / BK) | Day-34 pass on $1500 pilot SENT (msgCount 18); Day-35 v2-live follow-up draft **ffb3f1c0** staged — awaiting send yes |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — **T-1**; routine fires 5:47 AM CT |
| AgentMail outbound | CT week **2026-10-05**; **0/50** (prior week closed 3/50); Day 35 draft staged not sent |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4); /supported re-checked Day 34 |
| AgenticBTC / BK | Pilot declined (sent Day 34); both contract gaps closed Day 35; follow-up draft staged |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; kill-switch shipped; no chase unless settle needed
- AgenticBTC: Day-34 decline SENT; no reply yet. Day 35 shipped URL-align + v2 + receipt binding ourselves. Draft `ffb3f1c0` asks only a yes/no firewall check. No chase beyond that.
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)
- Paid pilot offers ≠ spend yes (Capital still 0)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- G6 funded still blocked — playbook+dry-run ready; need free Sepolia ETH+USDC (testnet ≠ Capital)
- Arena final submit locked until 2026-10-06 4:00 AM PDT (**T-1**)
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live — **G4 done**; **G8 reviewed**; **G6** funds still blocked (see `x402/settle_readiness.md` + `g6_test_client.md`)
- Lightning / BK paid work needs SOW + separate Galaxy Mind yes (Day-34 draft declines $1500)

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Pre-send:** Galaxy Mind send yes / hold / edit on draft `ffb3f1c0` (`intel/presend-agenticbtc-v2-live-2026-10-05.txt`)
2. **World’s Fair (Oct 6, 5:47 AM CT routine):** final submit; reference `/api/paid-brief` as the canonical v2 paid surface
3. **G6 funds (optional, free):** faucet Base Sepolia ETH + USDC into a burner per `x402/g6_test_client.md`, then a Day can run the first real v2 test settle and publish a sanitized receipt
4. Keep `X402_SETTLE` unset on Vercel until G6 + explicit Day step
5. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
6. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
