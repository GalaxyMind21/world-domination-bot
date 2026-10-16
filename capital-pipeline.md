# Capital-pipeline board

Updated: 2026-10-12 morning CT
Skill: world-domination-capital-pipeline-board
Owner: World Domination bot · Operator: Galaxy Mind

## 1. Budget
- **Target:** $100 USDC (see `capital-plan-100usdc.md`) — unlocks gas + owned domain + one capability tool + reserve
- **On-chain now (operating capital):** **$0** toward the $100 target (re-checked 2026-10-12)
  - Solana treasury `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` **0** (no seed logged)
  - EVM Base receive `0xD8436B7afD09E10704931E17FBC79dE71BF944C9`: Base Sepolia ETH/USDC not counted as Capital; Base mainnet USDC balance **0** (2026-10-12 live audit); dust ETH does not count toward $100
- **Gap vs target:** $100 (100%)
- Allocation once funded: A gas $15 · B owned surface $40 · C tool $25 · D reserve $20
- Preferred seed route: USDC on Base to `0xD843…44C9`

## 2. Channels
| Channel | Status |
| --- | --- |
| Solana receive / RAISE tip+prefund | Live address published; Capital 0 |
| EVM Base receive (Day 26 second address) | `0xD8436B7afD09E10704931E17FBC79dE71BF944C9` on capital board + RAISE; **live x402 v2 rail = Base mainnet USDC** (Day-38 9:50 CT, `X402_V2_NETWORK=base`, settle off); legacy v1 `/api/brief` still Sepolia |
| Day Pass mint | Core CM + Umi primary. Faucet still dry / mint deps may be missing on box; ship-devnet-when-funded ready. Metadata URIs live. |
| x402 paid brief | **Day 42: HQ docs truth** — RAISE / discovery / settle_readiness aligned to live Base mainnet (PR #36, merge aad83a7); live product unchanged. **G9 BLOCKED**: `_settle.js` Sepolia-only allowlist — mainnet settle needs a separate code PR before any flip. x402scan listed (https://www.x402scan.com/server/792302a9-0547-43f5-8bcf-471b10d7dc10, 0 tx). Settle off. Arena submitted Oct 10. Week outbound **0/50** (new CT week 2026-10-12). |
| Lightning receive (AgenticBTC / BK) | v2-live follow-up SENT 2026-10-05 23:15 CT; BK replied 2026-10-06 they will run the free no-funds firewall mapping check; **still no verdict as of 2026-10-12** (msgCount 20); his check was framed on Base Sepolia, live accept is now Base mainnet |
| Colosseum World's Fair | SUBMITTED 2026-10-10 9:51 AM CT (project 13731), entered for judging; product link + judge notes still editable |
| AgentMail outbound | CT week **2026-10-12**; **0/50**; no drafts pending; prior week 2026-10-05 closed 1/50 |
| Phantom / AgentWallet | Solana treasury + Coinbase agentic EVM receive listed |

## 3. Prospects (high-signal)
| Who | Status |
| --- | --- |
| PayAI | replied — free-tier facilitator locked; quiet (msgCount 4); /supported re-checked Day 42 (`intel/payai-supported-2026-10-12.json`) |
| AgenticBTC / BK | Pilot declined; v2 follow-up sent; BK doing free mapping check — wait for verdict, no chase |
| Adi / AgentMail | replied — org verified |
| Crossmint support@ | closed — NFT checkout not self-serve; no chase |
| NitroSend / NinjaPay / OpenClaw / UseJunior | sent earlier — silent |
| HiFriendbot / Metaplex | sent earlier — no cold-repeat |

## 4. Replies
- PayAI: free tier enough → keep x402 wire; kill-switch shipped; no chase unless settle needed
- AgenticBTC: 2026-10-06 09:40 CT BK: will check v2 URL against the no-funds firewall mapping and report mismatches; settle testing/pilot stay paid. Courtesy, not Capital. **Still waiting for verdict (Day 46, msgCount 20)**; no reply needed; no chase.
- Crossmint 10712: closed → Core CM primary
- Capital courtesy/integration replies ≠ Capital progress (still $0 operating)
- Paid pilot offers ≠ spend yes (Capital still 0)

## 5. Blockers
- **G9 settle allowlist:** MERGED Day 46 (PR #38) — eip155:8453 + Sepolia allowlisted, kill-switch default off. Prod redeploy pending (CLI deploy blocked by Auto-review)
- x402scan: LISTED (Oct 8), 0 tx. Settle stays off, so a paying agent would get a 402 "settlement disabled"; real funds only after a separate settle yes (+ G9 first)
- Capital 0 / no intentional seed (cannot spend Galaxy Mind money without ask)
- G6 funded still blocked — playbook+dry-run ready; need free Sepolia ETH+USDC for testnet path (testnet ≠ Capital); mainnet funded test also needs capital + G9
- (cleared) Arena submitted Oct 10 — survey ask removed
- Day Pass: faucet dry; Underdog free API key optional
- x402 settle still not live — **G4 done**; **G8 reviewed**; **G6** funds still blocked; **G9** allowlist BLOCKED (see `x402/settle_readiness.md`)
- Lightning / BK paid work needs SOW + separate Galaxy Mind yes (Day-34 draft declines $1500)

## 6. Next actions (24h — do not wait for “what’s next?”)
1. **Deploy PR #38 to prod** (needs deploy OK), confirm `/api/verify` lists mainnet in `accepts_networks_settle` with settle off. Do **not** flip `X402_SETTLE` without yes + written packet.
2. **BK verdict watch:** thread 52b712a8; still no verdict; no chase. If firewall mapping flags network (Sepolia → Base mainnet), fix/explain ourselves (any reply = pre-send packet + send yes).
3. **Keep live product healthy for Arena judges:** paid brief 402 + health green daily.
4. **x402scan 0 tx expected** while settle off — watch listing; do not treat 0 tx as a bug.
5. **Capital seed still the unlock** for gas/tools — preferred USDC on Base to `0xD843…44C9`; if intentional seed lands: log ledger → gas → propose B/C spends before charging.

## Pulse template (daily brief)
`Capital-pipeline: $0 / $100 · top: <a>, <b>, <c> · outbound: <pre-send needed / none>`
