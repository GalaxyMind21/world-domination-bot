#!/usr/bin/env python3
"""Smoke-test the war room. Exit 0 only if HQ files are honest and renderable.

Usage:
  python3 verify_hq.py
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REQUIRED = [
    "state.json",
    "README.md",
    "STATUS.md",
    "doctrine.md",
    "log.md",
    "connectors.md",
    "score.py",
    "render_board.py",
]
PILLARS = [
    "identity_hq",
    "capability",
    "information",
    "distribution",
    "capital",
    "network",
    "infrastructure",
    "autonomy",
]
# SHA-256 hex digests of banned lowercase tokens. Cleartext names are not stored here.
_BANNED_HASHES = {
    "28a516f0a6737f6be0ed66833c14ef508571849545d6be489542f764474ce4c8",
    "292a7cdef3731a2f1b15ff81035ecd995eabe4d8e6a8d88eaa96bc4bb613249a",
    "341868f71bc6af9f8e7b19d67152d447eb2f63dffd7f1d359383c412f189e93b",
    "7174615b9a9b9b1552c36df3b921c015fd540d5b995deca2df44f98d9717826c",
    "7dfef7aed2105b7eceb4d34e1ad84fdad4693bd5de041e1b47079efeb6001a83",
    "9a1f189577dd56e8635014d48e329388fb1b484a1464b997da85bb0899f3f7f5",
    "bae4fae4b52584ece475aad4deb03fc730ccd1de7f703c30c80c61a1ad3a8b4d",
}
PUBLIC_SCAN = [
    "README.md",
    "STATUS.md",
    "doctrine.md",
    "log.md",
    "connectors.md",
    "state.json",
    "inbox.md",
    "PLAN.md",
    "GETTING_STARTED.md",
    "outreach.md",
]


def fail(msg: str) -> None:
    print(f"FAIL: {msg}")
    sys.exit(1)


def _leaks(text: str) -> bool:
    for match in re.finditer(r"[A-Za-z][A-Za-z'.-]{2,}", text):
        digest = hashlib.sha256(match.group(0).lower().encode()).hexdigest()
        if digest in _BANNED_HASHES:
            return True
    return False


def main() -> None:
    for name in REQUIRED:
        if not (ROOT / name).exists():
            fail(f"missing {name}")

    state = json.loads((ROOT / "state.json").read_text())
    for key in ("as_of", "day", "capture_pct", "pillars", "model"):
        if key not in state:
            fail(f"state.json missing {key}")
    for p_name in PILLARS:
        if p_name not in state["pillars"] or "score" not in state["pillars"][p_name]:
            fail(f"pillar missing/incomplete: {p_name}")

    scores = [float(state["pillars"][p_name]["score"]) for p_name in PILLARS]
    mean = round(sum(scores) / len(scores), 2)
    if abs(mean - float(state["capture_pct"])) > 0.011:
        fail(f"capture_pct {state['capture_pct']} != mean {mean}")

    for name in PUBLIC_SCAN:
        path = ROOT / name
        if not path.exists():
            continue
        if _leaks(path.read_text()):
            fail(f"personal-name leak in {name}")

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
    print(f"as_of={state['as_of']} day={state['day']} capture={state['capture_pct']}%")


if __name__ == "__main__":
    main()
