# Capital-pipeline board

Updated: 2026-10-03 08:45 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-10-03)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet dust ETH — **does not inflate Capital score** until intentional seed toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-33 health re-verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 GET /brief | **Live alias Base Sepolia primary** → EVM receive. Solana secondary. **G4 kill-switch SHIPPED** (default off); **G8 REVIEWED** (free-packet reply SENT); **G6 playbook+dry-run SHIPPED** (funded still blocked). Settle not live. |
| Lightning receive (AgenticBTC / BK) | Day-27 decline SENT; Day-29 clarify SENT; **free-packet reply SENT 2026-10-02 ~5:49pm CT** (msgCount 16 = our send); watching for no-cost compatibility review |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — hold |
| AgentMail outbound | CT week **2026-09-28**; **2/50**; Day 33 no outbound |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4); /supported re-checked Day 33 |
| AgenticBTC / BK | Free-packet reply SENT; watching compatibility review (msgCount 16) |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; kill-switch shipped; no chase unless settle needed
- AgenticBTC: free-packet reply SENT Day 32 evening (canonical paid URL + sanitized settle schema; settle honesty; no paid SOW). **Watch for BK compatibility review — no chase email Day 33.**
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- G6 funded still blocked — playbook+dry-run ready; need free Sepolia ETH+USDC (testnet ≠ Capital)
- Arena final submit locked until 2026-10-06 4:00 AM PDT
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live — **G4 done**; **G8 reviewed+SENT**; **G6** funds still blocked (see `x402/settle_readiness.md` + `g6_test_client.md`)
- Lightning: any later paid work needs SOW + separate Galaxy Mind yes

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Watch:** thread `52b712a8` for BK no-cost compatibility review (no chase)
2. **G6 funds (optional):** faucet ETH + USDC per `x402/g6_test_client.md` into a burner; dry-run already works; keep `X402_SETTLE` unset until explicit Day
3. **Settle path:** keep `X402_SETTLE` unset on Vercel; only flip after G6 funds + explicit Day step
4. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
5. World’s Fair: hold draft; Oct 6 submit routine; no early final-submit
6. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
