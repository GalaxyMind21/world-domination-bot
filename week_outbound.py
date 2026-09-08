#!/usr/bin/env python3
"""Week outbound + reply-watch helper for owned AgentMail HQ.

Honest counts only from known thread evidence in outreach.md / state, plus
optional AgentMail API dumps you paste. Does not invent sends.

Usage:
  python3 week_outbound.py --print
  python3 week_outbound.py --check-replies PATH_TO_THREADS_JSON
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent
STATE = ROOT / "state.json"
OUTREACH = ROOT / "outreach.md"
CT = ZoneInfo("America/Chicago")

THREAD_RE = re.compile(
    r"thread\s+([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
    re.I,
)
DOMAIN_RE = re.compile(r"([a-z0-9.-]+\.[a-z]{2,})", re.I)


def week_start_ct(d: date | None = None) -> date:
    d = d or datetime.now(CT).date()
    return d - timedelta(days=d.weekday())  # Monday


def load_state() -> dict:
    return json.loads(STATE.read_text())


def parse_outreach_week_sends(week: date) -> list[dict]:
    """Parse Evidence lines under the CT week heading if present; fallback to state."""
    text = OUTREACH.read_text() if OUTREACH.exists() else ""
    sends: list[dict] = []
    # Prefer explicit "Week counter: N sent" blocks with thread lines nearby
    for m in re.finditer(
        rf"(###\s*{week.isoformat()}[^\n]*\n)(.*?)(?=\n### |\Z)",
        text,
        re.S,
    ):
        block = m.group(0)
        for line in block.splitlines():
            if "thread" not in line.lower():
                continue
            tid_m = THREAD_RE.search(line)
            if not tid_m:
                continue
            dom_m = DOMAIN_RE.search(line)
            sends.append(
                {
                    "threadId": tid_m.group(1),
                    "domain": dom_m.group(1).lower() if dom_m else "unknown",
                    "line": line.strip(),
                }
            )
    return sends


def check_replies(threads_json: Path) -> list[dict]:
    """Given list_threads/get_thread JSON, flag threads with messageCount > 1 or received label."""
    data = json.loads(threads_json.read_text())
    threads = data if isinstance(data, list) else data.get("threads") or [data]
    hits = []
    for t in threads:
        labels = set(t.get("labels") or [])
        count = int(t.get("messageCount") or 0)
        if count > 1 or "received" in labels:
            hits.append(
                {
                    "threadId": t.get("threadId"),
                    "subject": t.get("subject"),
                    "messageCount": count,
                    "labels": sorted(labels),
                    "recipients": t.get("recipients"),
                }
            )
    return hits


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--print", action="store_true", help="print week board")
    p.add_argument(
        "--check-replies",
        type=Path,
        help="path to AgentMail threads JSON dump",
    )
    args = p.parse_args()

    state = load_state()
    ws = week_start_ct()
    ceiling = int(
        (state.get("week_outbound_count_ct") or {}).get("ceiling")
        or state.get("outbound_ceiling")
        or 50
    )
    from_state = state.get("week_outbound_count_ct") or {}
    sent_state = int(from_state.get("sent") or 0)
    drafted = int(from_state.get("drafted") or 0)
    parsed = parse_outreach_week_sends(ws)
    sent = max(sent_state, len(parsed)) if parsed else sent_state

    if args.print or not args.check_replies:
        print(f"week_start_ct={ws.isoformat()} sent={sent}/{ceiling} drafted={drafted}")
        print(f"remaining={max(0, ceiling - sent)}")
        for s in parsed:
            print(f"  {s['domain']}  {s['threadId']}")
        if not parsed and sent_state:
            print("  (no outreach.md thread lines for this week yet; using state.json)")

    if args.check_replies:
        hits = check_replies(args.check_replies)
        print(f"reply_candidates={len(hits)}")
        for h in hits:
            print(
                f"  {h['threadId']} count={h['messageCount']} "
                f"labels={','.join(h['labels'])} :: {h.get('subject')}"
            )


if __name__ == "__main__":
    main()
