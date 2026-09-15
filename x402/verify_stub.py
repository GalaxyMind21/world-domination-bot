#!/usr/bin/env python3
"""Offline verify stub for the x402 twin — honest "not settled" only.

Does not call PayAI POST /verify or /settle. Importable or runnable CLI.
"""
from __future__ import annotations

import json
import os
import sys

FACILITATOR_BASE = "https://facilitator.payai.network"
RECEIVE = "C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC"
USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
NETWORK_V1 = "solana"
NETWORK_V2 = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"


def verify_stub(payment_signature: str | None = None, mode: str | None = None) -> dict:
    mode = (mode or os.environ.get("X402_MODE", "stub")).strip().lower()
    if mode == "live":
        return {
            "ok": False,
            "settled": False,
            "mode": mode,
            "status": "not_settled",
            "message": (
                "X402_MODE=live is reserved for a future facilitator wire; "
                "this stub still refuses to call PayAI. See facilitator_wire.md."
            ),
            "payment_signature_present": bool(payment_signature),
        }
    return {
        "ok": False,
        "settled": False,
        "mode": mode,
        "status": "not_settled",
        "message": "not settled — wire facilitator later",
        "payment_signature_present": bool(payment_signature),
        "payTo": RECEIVE,
        "asset": USDC_MINT,
        "network_v1": NETWORK_V1,
        "network_v2": NETWORK_V2,
        "facilitator": {
            "base": FACILITATOR_BASE,
            "verify": f"{FACILITATOR_BASE}/verify",
            "settle": f"{FACILITATOR_BASE}/settle",
            "supported": f"{FACILITATOR_BASE}/supported",
        },
    }


def main() -> None:
    sig = None
    if len(sys.argv) > 1:
        sig = sys.argv[1]
    print(json.dumps(verify_stub(sig), indent=2))


if __name__ == "__main__":
    main()
