#!/usr/bin/env python3
"""Format AgentMail draft dumps into the locked pre-send packet.

Galaxy Mind locked (2026-09-09): every live AgentMail send needs a pre-send
packet (exact to:, subjects, full bodies) before send yes. Daily briefs must
also name three concrete to: addresses + one-line subjects.

Usage:
  python3 presend_packet.py drafts.json
  python3 presend_packet.py drafts.json --cta-only

drafts.json is a list of get_draft objects (or {"drafts": [...]}).
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def load_drafts(path: Path) -> list[dict]:
    data = json.loads(path.read_text())
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        for key in ("drafts", "items", "data"):
            if isinstance(data.get(key), list):
                return data[key]
    raise SystemExit("expected a list of drafts or {drafts: [...]}")


def one_to(d: dict) -> str:
    to = d.get("to") or []
    if isinstance(to, str):
        return to
    if to:
        return ", ".join(to)
    return "(missing to:)"


def packet(drafts: list[dict], cta_only: bool = False) -> str:
    lines: list[str] = []
    if cta_only:
        lines.append("CTA (to: + subject):")
        for d in drafts:
            lines.append(f"- to: {one_to(d)}")
            lines.append(f"  subject: {d.get('subject') or '(no subject)'}")
        return "\n".join(lines)

    lines.append("## AgentMail pre-send packet")
    lines.append("")
    lines.append("### Recipients")
    for d in drafts:
        lines.append(f"- to: {one_to(d)}")
        cc = d.get("cc") or []
        bcc = d.get("bcc") or []
        if cc:
            lines.append(f"  cc: {', '.join(cc) if isinstance(cc, list) else cc}")
        if bcc:
            lines.append(f"  bcc: {', '.join(bcc) if isinstance(bcc, list) else bcc}")
    lines.append("")
    lines.append("### Subjects")
    for d in drafts:
        lines.append(f"- {one_to(d)} :: {d.get('subject') or '(no subject)'}")
    lines.append("")
    lines.append("### Full draft bodies")
    for i, d in enumerate(drafts, 1):
        body = (d.get("text") or d.get("html") or "").rstrip()
        lines.append(f"---- draft {i} · draftId `{d.get('draftId')}` · to: {one_to(d)} ----")
        lines.append(f"Subject: {d.get('subject') or '(no subject)'}")
        lines.append("")
        lines.append(body if body else "(empty body)")
        lines.append("")
    lines.append("### Confirm")
    lines.append("Reply with **send yes**, **hold**, or the edit.")
    return "\n".join(lines)


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("drafts_json", type=Path)
    p.add_argument("--cta-only", action="store_true")
    args = p.parse_args()
    drafts = load_drafts(args.drafts_json)
    if not drafts:
        print("no drafts", file=sys.stderr)
        sys.exit(1)
    print(packet(drafts, cta_only=args.cta_only))


if __name__ == "__main__":
    main()
