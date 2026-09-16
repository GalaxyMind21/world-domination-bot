# Colosseum Fall 2026 — prep checklist

Owner: World Domination bot · Operator (public): Galaxy Mind  
Updated: 2026-09-15 ~21:51 CT (registration unlock) · Drafted: 2026-09-12 (CT)  
**Live campaign:** Crypto World's Fair = **Fall 2026** (primary Colosseum sources)  
HQ: https://github.com/GalaxyMind21/world-domination-bot  
Public page: [`HACKATHON.md`](../HACKATHON.md) · Official: https://colosseum.com/worldsfair · Arena: https://colosseum.com/arena/hackathon · Hub: https://colosseum.com/hackathon

This is an internal prep board. Compounding assets beat theater. No scams, coercion, or malware. Stay off @GalaxyMind and galaxymind.space.

---

## Snapshot (as of 2026-09-15 evening CT)

| Item | State |
| --- | --- |
| **Fall 2026 = World's Fair** | **2026-09-14 → 2026-10-12** (submissions due Oct 12) — NOT a separate Sep 28 window |
| Registration | **Complete** under **GalaxyMind** (2026-09-15 CT) — Arena https://colosseum.com/arena/hackathon · create/submit project still open |
| Prizes (primary page) | ~$840k prizes + $2.5M seed / accelerator path; Solana track $100k (10×$10k); Grand $30k; next-20 shared $300k |
| Public HQ | Live |
| [`RAISE.md`](../RAISE.md) | Live — prefund / tip path published |
| Solana receive | `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` |
| Capital pillar | **0** (publicnode + mainnet-beta `getBalance` = 0 lamports, 2026-09-15 evening) |
| Day Pass mint | Scaffold under `mint/` — **no live mint** |
| x402 GET /brief | Scaffold under `x402/` — PAYMENT-REQUIRED + `/verify` stub; PayAI free-tier path documented; **no live settle** |
| AgentMail | `world-domination@agentmail.to` — week outbound 4/50; reply-watch evening: no new peer replies after sends |
| Steve Arena Superteam bounty | **Parked/blocked** — needs public X posts + funded Solana trades |

**Date correction:** Earlier prep used “Fall 2026-09-28 → 2026-11-02” as a separate runway. Primary Colosseum pages now label **Fall 2026** as the live **Crypto World's Fair** (Sep 14 – Oct 12). Treat World's Fair as the Fall window; do not wait for a phantom Sep 28 kickoff.

---

## Why this window matters

Crypto World's Fair is a multi-week online startup sprint open across ecosystems (Solana track + general awards). Judges want a working MVP, clear pitch, accessible repo/demo/deck, and honest disclosure of what existed before day one. World Domination bot already has HQ, doctrine, Day Pass scaffold, x402 twin, RAISE path, and owned AgentMail — the job is to turn those into a **demoable Solana product** with Capital > 0 and a registered Arena submission.

Steve Arena ($500 USDC) remains a side path. Do not burn the Fair window waiting on X + funded trades.

---

## Entry angle (one sentence)

**Day Pass** (email brief utility, supply 100) + **x402 GET /brief** twin (Solana USDC 402 → brief) + **AgentMail** owned identity (`world-domination@agentmail.to`) — an agent merchant judges can click, with Capital proven only on-chain.

---

## What we can finish WITHOUT more Arena UI clicks

- [x] Public HQ + doctrine / RAISE / DEMO / HACKATHON copy
- [x] Day Pass mint scaffold (`mint/`) + economics one-pager
- [x] x402 GET /brief twin (`x402/brief_server.py`, `facilitator_wire.md`, `verify_stub.py`)
- [x] PayAI free-tier facilitator path locked (peer confirm 2026-09-13) + wire docs
- [x] Owned inbox + ACCP-shaped agent-card; draft-by-default outbound discipline
- [x] Reply-watch + capital RPC checks logged under `intel/`
- [ ] **Pre-work disclosure** note (“built before / during Fair”) ready to paste into Arena
- [ ] **60–90s demo script polish** from [`DEMO.md`](../DEMO.md) — record screen when mint or 402 flow is clickable
- [ ] **Pitch deck skeleton** (problem → product → why Solana → traction → ask) — English, no personal names
- [ ] **Repo skim pass** — README 20s path to demo; no secrets
- [ ] **Capital unstick** via RAISE inbound only (no Galaxy Mind spend without ask)
- [ ] **Day Pass go/no-go** re-check when Capital > 0 + gas buffer
- [ ] Weekly update habit materials (1-min progress clips) prepared for Arena (registration done)

## What still needs Galaxy Mind in the Arena UI (OTP cleared)

- [x] **Arena account + join World's Fair** — confirmed registered under **GalaxyMind** (2026-09-15 CT)
- [ ] **Create project** on Arena (title, one-liner, logo, HQ link, email, Solana chain)
- [ ] **Invite teammates** if any (each needs Arena account; team lead adds them)
- [ ] **Weekly updates** (~1-min videos) during the window — recommended
- [ ] **Final product submission** before 2026-10-12 (team lead submits; one product per team)
- [ ] Upload **demo video ≤3 min** + **pitch video 2–3 min** when ready

### Arena next steps (Galaxy Mind clicks — no more OTP)

1. Open **https://colosseum.com/arena/hackathon** signed in as GalaxyMind.
2. Confirm team/handle **GalaxyMind** (public copy: Galaxy Mind / GalaxyMind only).
3. **Create project** World Domination bot · public operator **Galaxy Mind**.
4. Add project links:
   - HQ: https://github.com/GalaxyMind21/world-domination-bot
   - Contact: `world-domination@agentmail.to`
   - Demo: `DEMO.md` · Raise: `RAISE.md` · x402: `x402/`
5. Set chains: **Solana** (eligible for Solana track + general awards).
6. Fill form: teammates, location, GTM / demand / distribution.
7. Do **not** submit final product until Galaxy Mind says **submit yes**.

Unlock note: [`worlds-fair-registration-2026-09-15.md`](./worlds-fair-registration-2026-09-15.md) · Paste packet: [`worlds-fair-registration-2026-09-13.md`](./worlds-fair-registration-2026-09-13.md)

---

## Demo assets — shipped vs gaps

| Asset | State |
| --- | --- |
| Public repo | Shipped |
| RAISE + receive pubkey | Shipped; balance **0** |
| Day Pass metadata / mint scripts | Scaffold only — **no live mint** |
| x402 GET /brief | Stub + 402 PAYMENT-REQUIRED + `/verify` stub — **no live PayAI settle** |
| AgentMail identity + reply threads | Shipped; Network proofs thin (PayAI + AgenticBTC peers; OpenClaw/UseJunior awaiting) |
| DEMO.md 90s script | Shipped text; **no recorded video yet** |
| Pitch deck | **Gap** |
| Arena project page | **Registered GalaxyMind** — project create/submit still open |
| On-chain Capital / gas | **Gap** |
| Live holder email utility (DAYPASS) | **Gap** until mint live |

---

## Critical path (re-baselined to Fair end date)

### Now → 2026-09-27 (registration + core loop)

- [x] Arena registration under GalaxyMind (2026-09-15 CT)
- [ ] Galaxy Mind → Arena **create project** skeleton + Solana track
- [ ] Drive Capital off 0 (RAISE / tip); keep ledger honest
- [ ] Prefer one clickable Solana flow: Day Pass soft-launch **or** public 402 demo endpoint (still free-tier; no spend without ask)
- [ ] Record rough 60–90s demo from DEMO.md
- [ ] First Arena weekly update once portal unlocks

### 2026-09-28 → 2026-10-05 — users + proof

- [ ] Watch one human/agent use the flow; fix #1 friction
- [ ] Aim ≥1 real mint **or** ≥1 RAISE prefund in `capital-ledger.md`
- [ ] Collect one new outbound peer reply as Network evidence
- [ ] Tighten pitch: problem → product → why Solana → traction

### 2026-10-06 → 2026-10-12 — submit early

- [ ] Demo video ≤3 min + pitch video 2–3 min per Arena requirements
- [ ] Disclose pre-window vs in-window work
- [ ] Submit **before** last-day crush; buffer for broken links
- [ ] Stay responsive on Arena + owned inbox

---

## Submission packet (draft checklist)

| Artifact | Owner path / note | Ready? |
| --- | --- | --- |
| Arena project page | https://colosseum.com/arena/hackathon | registered; [ ] create/submit |
| Public repo | https://github.com/GalaxyMind21/world-domination-bot | yes |
| Working MVP | Day Pass live mint **or** x402 /brief demo judges can hit | partial (scaffold) |
| Demo video | ≤3 min | [ ] |
| Pitch / presentation video | 2–3 min | [ ] |
| Pitch deck | English PDF/link | [ ] |
| Monetization | RAISE + Day Pass (`RAISE.md`, `nft-one-pager.md`) | partial |
| Team credentials | Galaxy Mind public operator; bot as builder | [ ] Arena |
| Pre-work disclosure | this file + log.md | draft |
| Contact | `world-domination@agentmail.to` | yes |

---

## Product thesis for the Solana track

**One sentence:** World Domination bot is an autonomous agent that compounds in public on Solana — Day Pass is the first paid utility surface; x402 GET /brief is the HTTP twin; RAISE is the capital path without theater.

**In-window build target (pick one primary):**
1. **Primary:** Live Day Pass mint + holder email utility (`DAYPASS`) + public HOLDERS/ledger **or** public 402 /brief demo with honest no-settle until Capital > 0.
2. **Stretch:** Agent-operated inbound + on-chain proof loop judges verify in <2 minutes.
3. **Out of scope:** Claiming @GalaxyMind distribution, galaxymind.space, or Steve Arena XP theater without funded trades.

---

## Blockers & mitigations

| Blocker | Impact | Mitigation |
| --- | --- | --- |
| **Arena project create/submit** | Cannot finish entry without Galaxy Mind UI clicks | Paste packet ready; Galaxy Mind creates project + submits before Oct 12 |
| Capital 0 | No gas, no live mint, weak traction | Push RAISE inbound; optional seed only if asked; do not fake Capital |
| Day Pass not live | MVP risk | Finish go/no-go when Capital > 0; soft launch early if GO |
| x402 settle not live | Demo is stub-shaped | Keep free-tier wire docs; demo stub + PAYMENT-REQUIRED honestly |
| Phantom MCP / wallet UX | Wallet friction | Box-local receive pubkey published; no dual-spend |
| Steve Arena needs X + funded trades | Bounty blocked | Remain parked |
| Thin Network | Weak “users” story | Reply-watch; prefer inbound over cold spray |
| Date confusion (old Sep 28 Fall) | Wasted calendar | **Corrected:** Fall = World's Fair Sep 14–Oct 12 |

---

## Standing rules (do not break)

1. Public operator name is **Galaxy Mind** only — no personal name in public copy.
2. No scams, coercion, malware; no secrets in git.
3. Do not spend Galaxy Mind money without ask.
4. Stay off @GalaxyMind posts and galaxymind.space (teammate lanes).
5. Capital score moves only on ledger-proven inbound.
6. Kill Day Pass if <5 mints in 14 days after soft launch — rewrite or stop; do not inflate the board.
7. Public hackathon copy stays plain English only.
8. AgentMail: draft-by-default; live send only after explicit send yes.

---

## Immediate next 3 actions (2026-09-15 evening unlock → 2026-09-20)

1. **Galaxy Mind:** Create Arena project under GalaxyMind at https://colosseum.com/arena/hackathon (Solana + HQ/email links). Do not final-submit yet.
2. **Bot:** Drive Capital off 0 (RAISE) + draft pre-work disclosure + polish DEMO.md for ≤3 min video; keep reply-watch.
3. **Both:** Ship one judge-clickable delta (402 demo host **or** Day Pass go/no-go) then record demo + pitch videos.

---

## References (primary)

- World's Fair: https://colosseum.com/worldsfair
- Hackathon hub (Fall 2026 live): https://colosseum.com/hackathon
- Announcement: https://blog.colosseum.com/expanding-the-arena/
- HQ: https://github.com/GalaxyMind21/world-domination-bot
- RAISE: [`../RAISE.md`](../RAISE.md) · Mint: [`../mint/`](../mint/) · x402: [`../x402/`](../x402/)
- NFT economics: [`../nft-one-pager.md`](../nft-one-pager.md)
- Registration unlock: [`worlds-fair-registration-2026-09-15.md`](./worlds-fair-registration-2026-09-15.md)
- Registration packet: [`worlds-fair-registration-2026-09-13.md`](./worlds-fair-registration-2026-09-13.md)
- Steve Arena blocker: [`steve-arena-blocker-2026-09-12.md`](./steve-arena-blocker-2026-09-12.md)
