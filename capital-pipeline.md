# Capital-pipeline board

Updated: 2026-10-07 09:20 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` **0** (last checked 2026-10-05; no seed logged since)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet USDC balance **0** (2026-10-05); dust ETH does not count toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 primary rail = Base Sepolia** (Day-34 health re-verified) |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 paid brief | **Day 37: discoverable** via `/openapi.json` (x-payment-info 1.00 USD x402), `/.well-known/x402`, and bazaar extension on the 402; discovery audit 1 warning. Not yet registered on x402scan. **Day 35: canonical v2 resource LIVE** at `/api/paid-brief` (resource.url = challenging URL; Base Sepolia eip155:84532; receipt-binding extension). Legacy v1 `/api/brief?mode=402` deprecated + Link canonical. G4 kill-switch default off; **G6** funded test settle still blocked. Settle not live. |
| Lightning receive (AgenticBTC / BK) | v2-live follow-up SENT 2026-10-05 23:15 CT; BK replied 2026-10-06 they will run the free no-funds firewall mapping check (msgCount 20) |
| Colosseum World's Fair | Final submit blocked only by the required 10-question survey; awaiting Galaxy Mind's answers; deadline 2026-10-12 11:59 PM PT (separate hourly routine) |
| AgentMail outbound | CT week **2026-10-05**; **1/50**; no drafts pending |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4); /supported re-checked Day 34 |
| AgenticBTC / BK | Pilot declined; v2 follow-up sent; BK doing free mapping check — wait for verdict, no chase |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; kill-switch shipped; no chase unless settle needed
- AgenticBTC: 2026-10-06 09:40 CT BK: will check v2 URL against the no-funds firewall mapping and report mismatches; settle testing/pilot stay paid. Courtesy, not Capital. No reply needed; wait for verdict.
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)
- Paid pilot offers ≠ spend yes (Capital still 0)

## 5. Blockers
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- G6 funded still blocked — playbook+dry-run ready; need free Sepolia ETH+USDC (testnet ≠ Capital)
- Arena final submit waits on Galaxy Mind's survey answers (deadline Oct 12 11:59 PM PT)
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live — **G4 done**; **G8 reviewed**; **G6** funds still blocked (see `x402/settle_readiness.md` + `g6_test_client.md`)
- Lightning / BK paid work needs SOW + separate Galaxy Mind yes (Day-34 draft declines $1500)

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **x402scan:** register the origin (Add Server) so the discovered resource is indexed; record whether Base Sepolia resources index or get skipped
2. **BK verdict:** watch thread 52b712a8 for the firewall mapping pass/fail; fix any named contract mismatch ourselves the same day
3. **World’s Fair:** Arena final submit as soon as Galaxy Mind answers the survey (separate routine; deadline Oct 12)
4. **G6 funds (optional, free):** faucet Base Sepolia ETH + USDC into a burner per `x402/g6_test_client.md`, then first real v2 test settle + sanitized receipt; keep `X402_SETTLE` unset until then
5. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
6. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
