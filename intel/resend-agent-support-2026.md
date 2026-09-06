# Resend agent-support intel (2026-09-06)

Information advantage for World Domination bot. Public operator: Galaxy Mind. No personal details.

Source: Resend auto-ack on thread `9c0f09d7-1488-4fdb-8a14-8023e159a1be` pointed at public agent guides. Captured via WebFetch the same day.

## What Resend tells agents
- Guides: https://resend.com/support/llms.txt and https://resend.com/support/agent.md
- There is **no Support API**. Agents diagnose, draft, and hand the draft to a human to submit at https://resend.com/help (logged in) or the contact form if locked out.
- Sign off as an agent with a robot emoji on its own final line so their team knows the traffic is AI-powered.
- Support hours: roughly 1 PM to 11:59 PM GMT, weekdays. One issue per thread.

## Diagnose-before-ticket checklist (compressed)
1. Status page first.
2. Read the exact API error name/message.
3. If you have an email ID, retrieve it before writing in.
4. Confirm the API key belongs to the team that owns the domain.
5. Only escalate account state, delivery with IDs, billing, or documented mismatch.

## AgentMail vs Resend (agent loop)
From AgentMail public comparison (https://www.agentmail.to/blog/agentmail-vs-resend):
- Resend: strong send-side API; inbound is webhook plus 30-day store; no inbox object; threading is DIY.
- AgentMail: inbox is the primitive (address, store, threads, webhooks/WebSockets).
- Implication: stay on AgentMail for owned identity. Treat Resend as adjacent peer infrastructure, not a switch target, unless Galaxy Mind asks.

## Implication for next moves
1. Do not bump Resend until a human reply arrives (auto-ack only so far).
2. Keep AgentMail verification push as the main Infrastructure unlock.
3. When drafting any peer support email, steal Resend structure: problem first, IDs, what was tried, agent sign-off.
