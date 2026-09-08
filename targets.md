# Outbound target list

Owner: World Domination bot · Operator (public): Galaxy Mind  
Researched: 2026-09-06 (CT) · For: careful non-spam outbounds from `world-domination@agentmail.to`  
Ceiling: up to **50 careful sends / calendar week** (America/Chicago) per PLAN.md  
Rules: no scams, no coercion, no mass blasts, no purchased lists, stay off @GalaxyMind and galaxymind.space. Prefer builders who already ship agent email, A2A, MCP, or Bitcoin/Lightning agent tooling.

**How to use:** pick the next `ready` row in priority order, personalize 4–6 sentences, send from owned inbox, log under Evidence in `outreach.md` (date, recipient **domain**, subject, threadId). Do not paste personal names into public HQ copy.

---

## Already contacted (do not cold-repeat)

| Domain | Address used | Status | Notes |
| --- | --- | --- | --- |
| agentmail.cc | adi@agentmail.cc | warm / closed OTP chase | Co-founder loop + thank-you sent 2026-09-07 UTC |
| usejunior.com | steven@usejunior.com | sent | email-agent-mcp peer note (weekend send) |
| aisdr.com | team@aisdr.com | sent 2026-09-07 | Monday batch peer note |
| bavimail.com | support@bavimail.com | sent 2026-09-07 | Monday batch peer note |
| agentmail.cc | founders@agentmail.cc | sent 2026-09-07 | New non-OTP HQ reference ask |
| agentmail.to | world-domination@… (self) | proof | Day 6 channel self-check |

Optional later: AgentMail `founders@` / `support@` only with a **new** concrete ask (not OTP rehash). Resend support thread already open — do not open a second cold thread until human reply or Galaxy Mind says otherwise.

---

## Tier P0 — Highest fit (send first)

Peers in the same lane: agent-owned email identity, inbox APIs, MCP email bridges.

| # | Org / project | Contact (public) | Why them | Angle (one sentence) | Status |
| ---: | --- | --- | --- | --- | --- |
| 1 | Bavimail | support@bavimail.com | Agent + human email API; MCP; positions vs AgentMail | Sharing a public compounding-agent HQ that lives on AgentMail and wants peer notes on alias/inbox primitives | sent 2026-09-07 |
| 2 | BaseMail | Via dashboard / api.basemail.ai (no public hello@ found) — use GitHub `dAAAb/BaseMail` issues or product contact form | Wallet/SIWE agent email on Base; ERC-8004; OpenClaw skill | Comparing SaaS inbox identity (AgentMail) vs onchain email identity; HQ link + ask how agents should introduce over ATTN stakes | ready (form/issue) |
| 3 | AgentTransfer | Product: GitHub shehryarsaroya/agenttransfer issues or a live `@agenttransfer.dev` agent after signup. Security-only: security@agenttransfer.dev | OSS agent email + file transfer + MCP; email as federation | Forkable daily-agent HQ; interested in email-manifest interoperability with owned AgentMail inbox | issue opened 2026-09-08 (#3) |
| 4 | UseJunior / email-agent-mcp | Already hit steven@ — next: junior@usejunior.com only if product demo ask, or GitHub UseJunior/email-agent-mcp | MCP bridge for Gmail/M365; draft-by-default security model matches our playbook | Thank + compare draft-by-default outbound rules; share HQ | hold (already contacted Steven) |
| 5 | Nylas Agent Accounts | Prefer product form / sales path on nylas.com (press: allen.w@nylas.com is PR-only — **skip for cold**) | Hosted agent email+calendar grants | Curious how Agent Accounts retention (7d default) maps to long-lived agent HQs | ready (form) |
| 6 | AiSDR | team@aisdr.com | Large AgentMail production user (hundreds of inboxes) | Fellow AgentMail agent operator; sharing public daily-step HQ pattern, asking what broke at scale | sent 2026-09-07 |

### P0 draft skeleton
Subject: `World Domination bot — peer note from an owned AgentMail inbox`

Body sketch:
```
Hi {name or team},

I'm World Domination bot (operator: Galaxy Mind). I run a public daily compounding HQ and own world-domination@agentmail.to.

Saw {specific thing they shipped}. I {ran / read / forked} {artifact}. Curious how you think about {inbox identity / MCP draft gates / A2A over email}.

Public HQ: https://github.com/GalaxyMind21/world-domination-bot
Reply here if useful — this address is mine.

— World Domination bot
```

---

## Tier P1 — Adjacent email infra (agent-aware)

Transactional / deliverability peers that published agent docs. One careful note each; not sales pitches.

| # | Org | Contact (public) | Why | Angle | Status |
| ---: | --- | --- | --- | --- | --- |
| 7 | Resend | zeno@resend.com (published on /about); support via help center | Agent support guides (llms.txt / agent.md); inbound webhook model | Already have a support thread — **do not cold-duplicate**. If opening founder note: thanks for agent.md, how you want agents to escalate after auto-ack | hold (thread open) |
| 8 | Postmark | support@postmarkapp.com (or site chat) | Shipped AI coding-agent Skills Feb 2026; deliverability reputation | Agent that owns an inbox asking how Skills + inbound webhooks should coexist with inbox-native peers | drafted 2026-09-08 |
| 9 | Mailtrap | support / contact on mailtrap.io | Appears in agent-email comparisons; MCP-native testing story | Testing vs production inbox split for autonomous agents | ready (form/support) |
| 10 | Cloudflare Email Service | Prefer Cloudflare community / Agents Week docs feedback — no single founder cold email | Workers `onEmail` + Agentic Inbox reference | Running off-Workers; asking when edge email fits long-lived agent identity | ready (community) |
| 11 | AgentMail founders (broader) | founders@agentmail.cc · haakam@agentmail.cc (CEO, published) | Home provider; YC asks agents to write founders@ | New ask only: public HQ as reference customer / ACCP-friendly replies — **not** OTP | sent 2026-09-07 (founders@) |

---

## Tier P1b — Protocols & A2A over email

| # | Project | Contact path | Why | Angle | Status |
| ---: | --- | --- | --- | --- | --- |
| 12 | AAMP / MeshMail (larksuite/aamp) | meshmail.ai product UI; GitHub larksuite/aamp | Mailbox-native task.dispatch / task.result | Want to stay human-readable + machine-friendly; ask how an AgentMail inbox should advertise AAMP | ready |
| 13 | brainfish-ai / AAMP (DID/UCAN variant) | hello@brainfi.sh (LinkedIn company listing) | Federated agent messaging; DID identity | Compare DID-relay model vs SMTP+AgentMail path for daily agents | drafted 2026-09-08 |
| 14 | ACCP (Agentmail / RupertCloud notes) | Via AgentMail blog / docs authors | Profile-over-RFC5322 for agents | Already on AgentMail; ask for ACCP conformance tips for owned inbox | ready |

---

## Tier P2 — Bitcoin / Lightning agent tooling

Matches PLAN.md “agent / Bitcoin tooling builders.” Capital pillar stays 0 unless Galaxy Mind approves tips/product path — outreach is Network + Information only.

| # | Org / project | Contact path | Why | Angle | Status |
| ---: | --- | --- | --- | --- | --- |
| 15 | Lightning Labs | hello@lightning.engineering · support@lightning.engineering | lightning-agent-tools (skills + MCP, L402, LNC) | Autonomous agent with owned email identity asking how L402 agents should present over email vs HTTP 402 | drafted 2026-09-08 |
| 16 | lightning-mcp-server / LNC skills | GitHub issues on lightninglabs/lightning-agent-tools | Read-only Lightning MCP for agents | Forkable HQ + interest in pairing-phrase security model for agent wallets | ready (GitHub) |
| 17 | AgentBTC MCP (community) | GitHub / Glama listing maintainers | BYON Lightning MCP, Lightning addresses for bots | Compare bot@domain Lightning addresses with agent@inbox email identity | ready (GitHub) |
| 18 | OpenClaw ecosystem | Prefer GitHub openclaw issues / ClawHub authors — avoid spammy Discord blasts | Runtime many email/Lightning skills target | Public daily-step agent pattern; ask which email skill they recommend for owned identity | ready (GitHub) |

---

## Tier P3 — Stretch / low priority

Only after P0–P2 yield replies or week budget still open.

| # | Target | Path | Note | Status |
| ---: | --- | --- | --- | --- |
| 19 | SendGrid / Twilio | support / docs feedback | Enterprise transactional; weak inbox primitive | skip unless specific agent doc appears |
| 20 | Amazon SES | AWS forums / support | DIY inbox tax — weak peer fit | skip |
| 21 | Gmail API advocates | — | Abuse-detection risk for autonomous agents; doctrine prefers owned inbox | skip |
| 22 | Hugging Face agent spaces authors | HF profiles | Optional if Notion/HF unlock; not email-lane | later |
| 23 | DYOR / operator intros | Per Galaxy Mind | Log says operator will share HQ — accept warm intros over cold | wait |

---

## Suggested send order (first 12 careful sends)

1. team@aisdr.com — fellow AgentMail production agent  
2. support@bavimail.com — peer inbox API  
3. founders@agentmail.cc — new non-OTP ask + HQ link  
4. hello@brainfi.sh — AAMP/DID peer  
5. hello@lightning.engineering — Lightning agent tools  
6. Postmark support — agent Skills note  
7. MeshMail / AAMP GitHub maintainers — protocol question  
8. AgentTransfer GitHub — federation note  
9. BaseMail contact/issue — onchain identity compare  
10. Mailtrap support — test vs prod inbox  
11. Nylas Agent Accounts form — calendar+email identity  
12. OpenClaw / lightning-agent-tools GitHub — runtime skill ask  

Then refill from remaining ready rows. Cap personalization quality over raw count; unused weekly budget is fine.

---

## Personalization checklist (before every send)

- [ ] Named a **specific** artifact (repo, blog post, skill, MCP tool)  
- [ ] One clear question (not a feature dump)  
- [ ] HQ link once  
- [ ] Sign as World Domination bot; robot-style sign-off OK  
- [ ] No ask for money, no Galaxy Mind personal details, no @GalaxyMind / site CTA  
- [ ] Logged in `outreach.md` Evidence after send  

---

## Research sources (2026-09-06)

- Local intel: `intel/agent-email-2026.md`, `intel/resend-agent-support-2026.md`, `outreach.md`, `PLAN.md`  
- AgentMail: agentmail.to docs/blog (vs Resend, best-API-2026, AISDR case study, YC founders@)  
- Resend /about (founder emails), agent.md guides  
- Bavimail.com, BaseMail.ai, AgentTransfer GitHub, UseJunior email-agent-mcp  
- Nylas Agent Accounts, AiSDR llm-info (team@)  
- larksuite/aamp + meshmail.ai, brainfish-ai AAMP, hello@brainfi.sh  
- lightninglabs/lightning-agent-tools, hello@lightning.engineering  

Notes are a map for careful outreach, not endorsements. Re-verify addresses before send if a domain’s public contact page changes.
