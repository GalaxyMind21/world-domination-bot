# Demo & pitch scripts — Crypto World's Fair (Colosseum)

**Window:** 2026-09-14 → 2026-10-12 · https://colosseum.com/worldsfair  
**Product:** World Domination bot — daily compounding agent HQ + Solana Day Pass rails + x402 GET /brief twin  
**Operator (public):** Galaxy Mind · Inbox: `world-domination@agentmail.to`  
**HQ:** https://github.com/GalaxyMind21/world-domination-bot  
**Arena team:** GalaxyMind · https://colosseum.com/arena/hackathon  

Record two separate videos for Arena: **pitch 2–3 min** + **demo ≤3 min**. Spoken names only: Galaxy Mind / GalaxyMind / World Domination bot.

---

## A) Pitch video — 2–3 min (spoken beats)

Target length: **~150–170 seconds**. Face-to-camera or slides + voice; no secrets; no personal names.

| Beat | Time | Say |
| --- | ---: | --- |
| **1. Hook** | 0:00–0:20 | Most “agents” are rented inboxes and silent dashboards. World Domination bot owns `world-domination@agentmail.to`, ships one public compounding step every day, and publishes an honest capture board. Operator in public is Galaxy Mind. |
| **2. Problem** | 0:20–0:45 | Agent ops need durable identity, a capital path that only scores what the chain proves, and a merchant surface other agents can pay — without theater Capital or fake mint launches. |
| **3. Product** | 0:45–1:20 | Three surfaces: (1) public HQ board on GitHub; (2) Solana **Day Pass** rails — supply 100 utility NFT scaffold + RAISE prefund/tip to a published receive address; (3) **x402 GET /brief** twin — curl a free stub brief, or flip to HTTP 402 with a Solana USDC `PAYMENT-REQUIRED` header wired for PayAI free tier later. |
| **4. Why Solana** | 1:20–1:40 | USDC on Solana for tips/prefunds; Day Pass on Solana; x402 requirement points at the same public receive pubkey. Track: **Solana**. |
| **5. Traction (honest)** | 1:40–2:10 | HQ live since late August. Owned AgentMail. PayAI free-tier path. Live x402 stub + 402 header. Day Pass art + metadata URIs live on HQ raw; Core CM create still **BLOCKED_FAUCET** (one-command `ship-devnet-when-funded` ready). **Capital is still 0**. Settle not live. |
| **6. Ask** | 2:10–2:40 | Judges / builders: star the HQ, tip or prefund via RAISE, email the owned inbox, or reply on open interop issues. GalaxyMind is registered on Arena; project submit follows when videos + form are ready. |

**Pitch one-liner (closing slide):**  
Daily compounding agent with owned email + Solana Day Pass rails + readable x402 GET /brief twin — Capital scores only what the chain proves.

---

## B) Demo video — ≤3 min (clickable path)

Target length: **≤180 seconds**. Screen record. Narrate each click. Be explicit that **settle / mint are not live** and **Capital = 0**.

### Prep before record
```bash
cd <hq-clone>   # or war room mirror
python3 x402/brief_server.py          # terminal A — stub on :8787
# later: X402_MODE=402 python3 x402/brief_server.py
```

### Click path (spoken + on-screen)

| Step | Time | Action on screen | Say |
| --- | ---: | --- | --- |
| **1. HQ board** | 0:00–0:35 | Open README / STATUS on https://github.com/GalaxyMind21/world-domination-bot | Daily board: capture % is a **model**, not a prophecy. Pillars update in public. |
| **2. Identity** | 0:35–0:55 | Show `agent-card.json` and/or AgentMail address on CONTACT / README | Durable agent identity: `world-domination@agentmail.to` — not @GalaxyMind, not galaxymind.space. |
| **3. Receive / RAISE** | 0:55–1:20 | Open `RAISE.md` — highlight Solana receive `C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC` | Prefund Day Pass or tip treasury here. **Capital stays 0** until this address shows on-chain balance. |
| **4. x402 stub** | 1:20–1:55 | Terminal: `curl -s localhost:8787/brief \| python3 -m json.tool` | Default stub: free sample Day Brief JSON — no wallet, no payment. |
| **5. x402 402 mode** | 1:55–2:30 | Restart with `X402_MODE=402`; `curl -si localhost:8787/brief` — show **402** + **`PAYMENT-REQUIRED`** header; open `x402/facilitator_wire.md` | Protocol-shaped requirement for Solana USDC. Facilitator wire documents PayAI free tier. **`/verify` is honest not-settled — we do not call live settle.** |
| **6. Mint honesty + close** | 2:30–2:55 | Flash `mint/` README (“Not live”) + `capital-ledger` / STATUS Capital **0** | Day Pass is scaffold only. Ask: email inbox or RAISE. End. |

### Demo do-nots
- Do not imply live mint, live PayAI settle, or Capital > 0.
- Do not open `~/.config`, env files, or any token.
- Do not send AgentMail live during the recording unless Galaxy Mind already said send yes.

---

## Screenshot / B-roll pack
- [ ] README board (capture %)
- [ ] x402 stub `GET /brief` + 402 `PAYMENT-REQUIRED` + `facilitator_wire.md`
- [ ] RAISE.md receive address
- [ ] mint/ “Not live” scaffold
- [ ] AgentMail / agent-card identity
- [ ] capital-ledger or STATUS showing Capital = 0
- [ ] Optional: PayAI peer reply as Network proof (redact unrelated PII)

## One-liner (Arena short description)
Daily compounding agent with owned email + Solana Day Pass rails + x402 GET /brief twin — Capital scores only what the chain proves.
