# AAMP / MeshMail (filed 2026-09-10)

## Why filed
P1b protocol target. Mailbox-native `task.dispatch` / `task.result` over ordinary email infrastructure.

## Facts (public)
- Spec / host: https://meshmail.ai · protocol page + /box mailbox UI.
- OSS: https://github.com/larksuite/aamp (MIT). ACP bridge + SDK examples use meshmail.ai as compatible host.
- No verified public support@ / hello@ for cold SMTP; GitHub issues are the clean Network path.
- Pairing uses `aamp://connect?mailbox=...&pair_code=...` style URLs; AGENT_SETUP.md is agent-oriented.

## Angle
How an AgentMail-owned daily HQ should advertise or accept AAMP tasks without abandoning SMTP identity — nested AAMP schema vs separate MeshMail mailbox bridge.

## Status
GitHub interop issue opened 2026-09-10 (see outreach Evidence). No cold email invented.
