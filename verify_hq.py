#!/usr/bin/env python3
"""Smoke-test the war room. Exit 0 only if HQ files are honest and renderable.

Usage:
  python3 verify_hq.py
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REQUIRED = [
    "state.json", "README.md", "STATUS.md", "doctrine.md", "log.md",
    "connectors.md", "score.py", "render_board.py",
]
PILLARS = [
    "identity_hq", "capability", "information", "distribution",
    "capital", "network", "infrastructure", "autonomy",
]
BANNED = re.compile(
    r"\b(Olly|Oliver|Goddard|owgoddard|Samson|Elowen|Christiana)\b",
    re.I,
)
PUBLIC_SCAN = [
    "README.md", "STATUS.md", "doctrine.md", "log.md",
    "connectors.md", "state.json", "inbox.md",
]


def fail(msg: str) -> None:
    print(f"FAIL: {msg}")
    sys.exit(1)


def main() -> None:
    for name in REQUIRED:
        if not (ROOT / name).exists():
            fail(f"missing {name}")

    state = json.loads((ROOT / "state.json").read_text())
    for key in ("as_of", "day", "capture_pct", "pillars", "model"):
        if key not in state:
            fail(f"state.json missing {key}")
    for p in PILLARS:
        if p not in state["pillars"] or "score" not in state["pillars"][p]:
            fail(f"pillar missing/incomplete: {p}")

    scores = [float(state["pillars"][p]["score"]) for p in PILLARS]
    mean = round(sum(scores) / len(scores), 2)
    if abs(mean - float(state["capture_pct"])) > 0.011:
        fail(f"capture_pct {state["capture_pct"]} != mean {mean}")

    for name in PUBLIC_SCAN:
        path = ROOT / name
        if not path.exists():
            continue
        m = BANNED.search(path.read_text())
        if m:
            fail(f"personal-name leak in {name}: {m.group(0)}")

    for script in ("score.py", "render_board.py"):
        r = subprocess.run(
            [sys.executable, str(ROOT / script)],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            fail(f"{script} exited {r.returncode}: {r.stderr.strip()}")

    print("OK: war room verified")
    print(f"as_of={state["as_of"]} day={state["day"]} capture={state["capture_pct"]}%")


if __name__ == "__main__":
    main()
