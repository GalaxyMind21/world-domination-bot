# Capital-pipeline board

Updated: 2026-10-04 08:55 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` getBalance **0** (mainnet-beta 2026-10-04)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet dust ETH — **does not inflate Capital score** until intentional seed toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-34 health re-verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 GET /brief | **Live alias Base Sepolia primary** → EVM receive. Solana secondary. **G4 kill-switch SHIPPED** (default off); **G8 REVIEWED**; BK compat review flags **v1≠v2** + **resource URL mismatch**; **G6** funded still blocked. Settle not live. |
| Lightning receive (AgenticBTC / BK) | Free-packet SENT; **compat review inbound** 2026-10-03 (msgCount 17); Day-34 draft **58be7ca0** staged (decline $1500 pilot) — awaiting send yes |
| Colosseum World's Fair | Arena draft green; submit unlocks 2026-10-06 4am PDT — **T-2 hold** |
| AgentMail outbound | CT week **2026-09-28**; **2/50**; Day 34 draft staged not sent |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4); /supported re-checked Day 34 |
| AgenticBTC / BK | Compat review inbound; $1500 pilot offered → capital-protect draft staged (decline) |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; kill-switch shipped; no chase unless settle needed
- AgenticBTC: NEW compat review (v1≠v2; URL mismatch; wants receipt + idempotency; offers $1500 pilot). **Draft staged Day 34 — decline paid pilot; own Capability path for URL+v2. Awaiting send yes. No chase beyond that.**
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)
- Paid pilot offers ≠ spend yes (Capital still 0)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- BK public firewall wants **x402 v2**; live contract still **v1**; paid URL `?mode=402` ≠ challenge resource `/api/brief`
- G6 funded still blocked — playbook+dry-run ready; need free Sepolia ETH+USDC (testnet ≠ Capital)
- Arena final submit locked until 2026-10-06 4:00 AM PDT (**T-2**)
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live — **G4 done**; **G8 reviewed**; **G6** funds still blocked (see `x402/settle_readiness.md` + `g6_test_client.md`)
- Lightning / BK paid work needs SOW + separate Galaxy Mind yes (Day-34 draft declines $1500)

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Pre-send:** Galaxy Mind send yes / hold / edit on draft `58be7ca0` (`intel/presend-agenticbtc-compat-review-2026-10-04.txt`)
2. **Capability next (after send or in parallel Day):** align paid URL with challenge `resource`; investigate x402 v2 emit
3. **G6 funds (optional):** faucet ETH + USDC per `x402/g6_test_client.md` into a burner; keep `X402_SETTLE` unset until explicit Day
4. **Settle path:** keep `X402_SETTLE` unset on Vercel; only flip after G6 funds + explicit Day step
5. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
6. World’s Fair: hold draft; **Oct 6** submit routine (T-2); no early final-submit
7. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
