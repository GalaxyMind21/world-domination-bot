#!/usr/bin/env python3
"""World Domination bot — pillar score + ETA helper. Honest math only."""
from __future__ import annotations

import argparse
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STATE = ROOT / "state.json"
PILLAR_ORDER = [
    "identity_hq",
    "capability",
    "information",
    "distribution",
    "capital",
    "network",
    "infrastructure",
    "autonomy",
]


def load() -> dict:
    return json.loads(STATE.read_text())


def capture(pillars: dict) -> float:
    scores = [float(pillars[k]["score"]) for k in PILLAR_ORDER]
    return round(sum(scores) / len(scores), 2)


def eta_days(capture_pct: float, velocity: float) -> float:
    if velocity <= 0:
        return float("inf")
    return round((100.0 - capture_pct) / velocity, 1)


def label(days: float) -> str:
    if days == float("inf"):
        return "undefined (velocity <= 0)"
    years = days / 365.25
    if years >= 1:
        return f"{days:.0f} days (~{years:.1f} years) on the grind curve"
    return f"{days:.0f} days (~{days/30.44:.1f} months) on the grind curve"


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--print", action="store_true", help="print current board")
    p.add_argument("--velocity", type=float, help="override assumed ongoing velocity %/day")
    args = p.parse_args()

    state = load()
    pillars = state["pillars"]
    cap = capture(pillars)
    vel = args.velocity if args.velocity is not None else float(
        state["model"]["assumed_ongoing_velocity_pct_per_day"]
    )
    days = eta_days(cap, vel)
    print(f"as_of={state.get('as_of')} capture={cap}% velocity={vel}%/day")
    print(f"ETA={label(days)}")
    for k in PILLAR_ORDER:
        print(f"  {k}: {pillars[k]['score']} — {pillars[k]['note']}")


if __name__ == "__main__":
    main()
