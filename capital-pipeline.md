# Capital-pipeline board

Updated: 2026-10-08 09:15 CDT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` **0** (re-checked 2026-10-08; no seed logged)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet USDC balance **0** (2026-10-08); dust ETH does not count toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 v2 rail = Base mainnet USDC** (Day-38 9:50 CT, `X402_V2_NETWORK=base`, settle off); legacy v1 `/api/brief` still Sepolia |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 paid brief | **Day 38 9:50 CT: Base mainnet live (Galaxy Mind yes)** — prod `dpl_FcC196f7So2f3jvo5xn6GdJbegjx`, 402 = `eip155:8453` Base USDC `0x8335…2913` → `0xD843…44C9`, `X402_SETTLE` unset, settle_live false. x402scan preview: **2 valid resources**, not registered yet (public Add API click, no wallet). Earlier Day 38: x402scan refused listing ("No supported networks. Got: [base_sepolia]. Supported: [base, solana]"); shipped default-off `X402_V2_NETWORK=base` mainnet switch (PR #31, prod dpl_CBdZSDCiUingXvEeReWqmHJhMhmJ, still Sepolia live). **Day 37: discoverable** via `/openapi.json` (x-payment-info 1.00 USD x402), `/.well-known/x402`, and bazaar extension on the 402; discovery audit 1 warning. Not yet registered on x402scan. **Day 35: canonical v2 resource LIVE** at `/api/paid-brief` (resource.url = challenging URL; Base Sepolia eip155:84532; receipt-binding extension). Legacy v1 `/api/brief?mode=402` deprecated + Link canonical. G4 kill-switch default off; **G6** funded test settle still blocked. Settle not live. |
| Lightning receive (AgenticBTC / BK) | v2-live follow-up SENT 2026-10-05 23:15 CT; BK replied 2026-10-06 they will run the free no-funds firewall mapping check; no verdict as of 2026-10-08 (msgCount 20) |
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
- x402scan listing: mainnet flip done; registration (public Add API click, no wallet) waits on go. Settle stays off; real funds only after a separate settle yes
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- G6 funded still blocked — playbook+dry-run ready; need free Sepolia ETH+USDC (testnet ≠ Capital)
- Arena final submit waits on Galaxy Mind's survey answers (deadline Oct 12 11:59 PM PT)
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live — **G4 done**; **G8 reviewed**; **G6** funds still blocked (see `x402/settle_readiness.md` + `g6_test_client.md`)
- Lightning / BK paid work needs SOW + separate Galaxy Mind yes (Day-34 draft declines $1500)

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **x402scan register:** mainnet flip DONE (Day 38). On go, click **Add API (2 resources)** at x402scan `/resources/register` for `world-domination-x402.vercel.app` (tRPC `registerFromOrigin` is public: no wallet sign-in). Optional verified badge needs a payTo-signed ownership proof (wallet signature) — separate yes. Keep `X402_SETTLE` unset
2. **BK verdict:** watch thread 52b712a8 for the firewall mapping pass/fail; fix any named contract mismatch ourselves the same day
3. **World’s Fair:** Arena final submit as soon as Galaxy Mind answers the survey (separate routine; deadline Oct 12)
4. **G6 funds (optional, free):** faucet Base Sepolia ETH + USDC into a burner per `x402/g6_test_client.md`, then first real v2 test settle + sanitized receipt; keep `X402_SETTLE` unset until then
5. **Day Pass:** human faucet → `AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9` then `npm run ship-devnet-when-funded`
6. If intentional seed lands on Solana or EVM receive: log ledger → gas → propose B/C spends before charging

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
