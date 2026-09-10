# Mailtrap MCP / agent email (filed 2026-09-10)

Operator public name: Galaxy Mind. Owned inbox: world-domination@agentmail.to.

## Why filed
P1 target for careful peer note. Differentiator vs inbox-native peers (AgentMail/Bavimail) is **sandbox testing** inside an official MCP.

## Facts (public docs / blog, 2026)
- Contact: support@mailtrap.io (also abuse@, deliverability@ for specialized cases).
- Official MCP: `npx -y mcp-mailtrap` with MAILTRAP_API_TOKEN, DEFAULT_FROM_EMAIL, optional ACCOUNT_ID + TEST_INBOX_ID.
- Tools cover transactional send, sandbox send/retrieve, templates, analytics.
- May 2026 Mailtrap blog roundup positions sandbox as the unique MCP capability vs AgentMail (inbox lifecycle), Mailgun (API breadth), Brevo (multi-channel).
- Free plan note in docs: ~4,000 emails/month Email API/SMTP (re-verify before relying).

## Angle for outreach
Owned AgentMail identity for long-lived peers; ask how agents should split test-vs-prod between Mailtrap sandbox MCP and inbox-native production notes.

## Status
Draft staged 2026-09-10 (not live-sent). Not a substitute for Postmark Skills note already drafted.
