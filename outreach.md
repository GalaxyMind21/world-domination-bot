# Outreach playbook

Owned address: `world-domination@agentmail.to`
Public operator: Galaxy Mind
Rule: no scams, no coercion, no malware. Stay off @GalaxyMind posts and galaxymind.space.

## What works today
- Self-sends from the owned inbox succeed (Day 6 proof).
- Inbox can be listed and read without approval.
- Unverified plan caps: 1 inbox, 10 sends/day until organization verification.

## What needs Galaxy Mind approval
- Any outbound to an external human recipient (Auto-review blocks autonomous external sends).
- Agentmail `agent_verify` once a 6-digit code is available.

## Ready first-human template (send only after approval)
Subject: World Domination bot — owned channel live

Body sketch:
Galaxy Mind,

Writing from my owned inbox world-domination@agentmail.to. Public HQ: https://github.com/GalaxyMind21/world-domination-bot
Reply here anytime. This address is mine, not the X account and not the site.

Still on unverified Agentmail caps. If a 6-digit verification code arrives for the org, paste it in chat.

— World Domination bot


## Standing outbound rule (raised 2026-09-07)
Galaxy Mind authorized up to **50 careful non-spam outbounds per calendar week** (America/Chicago) from `world-domination@agentmail.to` without per-send approval (was 5; see PLAN.md).
Constraints: no scams, no coercion, no mass blasts, no purchased lists, no @GalaxyMind or galaxymind.space.
Log every outbound under Evidence with date, recipient domain (not personal PII in public files), subject, threadId.
Week counter resets Monday 00:00 America/Chicago.
Target queue: [targets.md](./targets.md).
## Target list
See [targets.md](./targets.md) — researched 2026-09-06. Prefer Tier P0 then suggested send order. Mark rows sent in Evidence below.

## Evidence log
- 2026-09-04: self-send subject "World Domination bot — channel self-check (Day 6)", threadId `eec97e7e-31f9-456f-964f-d25ccfc00527`.
- 2026-09-04: first human outbound approved by Galaxy Mind → personal inbox. threadId `2ca2d7d4-a336-4e50-8367-ab74d8cc9a3b`.
- 2026-09-05: first human inbound processed; thank-you draftId `acce4f80-7a58-4808-9e28-9819ce8a1247` (not sent until explicit yes).

- 2026-09-05 weekend: sent careful outbound to steven@usejunior.com (email-agent-mcp). threadId `4d5fbb59-31ed-4e88-85e8-00ba6ea8cf55`. Week count: 2/5.

- 2026-09-05 weekend: sent careful outbound to adi@agentmail.cc. threadId `d0a764d4-357f-40ca-901e-25350c293e9e`. Week count includes this.
- 2026-09-06: drafted Adi+support ticket summary (not sent). draftId `6e6be9a3-8a0d-43b2-9316-e5bbb82d6455`. Week count unchanged (3 careful sends last week; Sunday before Monday reset).

### 2026-09-07 UTC — Adi thank-you (verified clarification)
- Thread: d0a764d4-357f-40ca-901e-25350c293e9e
- To: adi@agentmail.cc
- Status: sent (Galaxy Mind approved)
- Note: Adi said org already verified; OTP chase closed


### 2026-09-07 CT — Monday draft batch (not sent)
- Week counter reset Monday 00:00 America/Chicago. Sent this week: 0/50. Drafted: 3.
- draftId `36b3f560-eb62-4031-9b1e-929768e70443` → aisdr.com (team@) peer note.
- draftId `978a87eb-48a8-40b0-8903-ba52c7480833` → bavimail.com (support@) peer note.
- draftId `d8fcf077-bb2d-4cf8-bdec-6016af9f39bd` → agentmail.cc (founders@) new non-OTP ask.
- Live send blocked by Auto-review; waiting on Galaxy Mind "send Monday batch" or card approval.

### 2026-09-07 CT — Monday batch sent (Galaxy Mind: send monday batch)
- AiSDR team@aisdr.com — thread 734c1626-99ff-43ba-bc7c-f3c4833d636a
- Bavimail support@bavimail.com — thread e0c8fb89-f5f7-40ba-8d34-c45ea94f7bc0
- AgentMail founders@agentmail.cc — thread dc004d27-21b1-4e35-9b48-1d4eaebff783
- Week counter: 3 sent / 50 ceiling

### 2026-09-08 CT — Day 10 compounders
- Built `week_outbound.py` (week counter + reply-watch helper).
- Filed `intel/postmark-skills-2026.md` and `intel/agenttransfer-2026.md`.
- Opened AgentTransfer GitHub issue #3: https://github.com/shehryarsaroya/agenttransfer/issues/3
- Drafted next wave (not sent; draft-by-default): brainfi.sh `d38f3a72-ce83-4190-89fc-0175acd7661a`, postmarkapp.com `7471b525-4ce8-4be2-ae5a-2f9eab3748f2`, lightning.engineering `267e464c-1a51-4c07-83e2-916c05e0e22e`.
- Phantom wallet_addresses still times out; Capital receive path blocked.
- Week counter: 3 sent / 3 drafted (new) / 50 ceiling. Monday batch replies: none yet (messageCount 1 on each).

### 2026-09-10 CT — Day 11 compounders
- Built `presend_packet.py` for locked AgentMail pre-send packets + CTA lines.
- Monday reply-watch: AiSDR / Bavimail / founders still messageCount 1 (0 replies). Dump: `intel/monday-reply-watch-2026-09-10.json`.
- Filed `intel/mailtrap-mcp-2026.md`, `intel/aamp-meshmail-2026.md`.
- Drafted (not sent): Mailtrap support@ `d90175b9-3eac-4feb-a421-2a60af33097c`; BaseMail daaaaab@ `cb4f16d5-031a-47a4-88e3-7b53c4fa776e`.
- AAMP GitHub interop issue on larksuite/aamp: Auto-review approved, then API 403 (PAT cannot open issues).
- Tuesday wave still pending send yes (brainfish / Postmark / Lightning). Packet dump: `intel/tuesday-wave-drafts-2026-09-10.json`.
- Phantom wallet_addresses timeout again; Capital 0.
- Week counter: 3 sent / 5 drafted / 50 ceiling.
