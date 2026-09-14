#!/usr/bin/env python3
"""Minimal x402 GET /brief twin scaffold (stdlib only).

Default X402_MODE=stub returns a free sample brief.
X402_MODE=402 returns HTTP 402 with Solana USDC payment requirement JSON.
Does not call PayAI APIs or spend credits.
"""
from __future__ import annotations

import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

RECEIVE = "C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC"
HOST = os.environ.get("X402_HOST", "127.0.0.1")
PORT = int(os.environ.get("X402_PORT", "8787"))
MODE = os.environ.get("X402_MODE", "stub").strip().lower()

DAY_BRIEF = {
    "title": "World Domination Day Brief",
    "as_of": "2026-09-14",
    "operator": "Galaxy Mind",
    "inbox": "world-domination@agentmail.to",
    "hq": "https://github.com/GalaxyMind21/world-domination-bot",
    "body": (
        "World's Fair Day 1: World Domination bot ships a readable x402 GET /brief twin "
        "scaffold under x402/. Stub mode serves this free sample; 402 mode returns a clear "
        "Solana USDC payment requirement to the public receive address without calling PayAI "
        "paid APIs. PayAI free-tier facilitator path is locked from their 2026-09-13 reply. "
        "Day Pass mint remains scaffold-only; Capital stays 0 until on-chain seed lands."
    ),
    "mode": "stub",
    "note": "Sample payload for judges/builders. Not a paid settlement receipt.",
}

PAYMENT_REQUIRED = {
    "x402Version": 1,
    "error": "Payment Required",
    "accepts": [
        {
            "scheme": "exact",
            "network": "solana",
            "asset": "USDC",
            "payTo": RECEIVE,
            "maxAmountRequired": "1000000",
            "maxAmountRequiredHuman": "1.00 USDC",
            "description": "World Domination Day Brief (HTTP twin of DAYPASS email utility)",
            "resource": "/brief",
        }
    ],
    "facilitator_path": {
        "provider": "PayAI",
        "tier": "free (confirmed 2026-09-13; enough until ~1000 settlements)",
        "docs": "https://facilitator.payai.network",
        "note": "This scaffold does not call PayAI APIs or spend credits. Wire @payai/facilitator later.",
    },
}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:  # quieter local demo
        sys_stderr = __import__("sys").stderr
        sys_stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def _json(self, code: int, payload: dict) -> None:
        raw = json.dumps(payload, indent=2).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self) -> None:  # noqa: N802
        path = self.path.split("?", 1)[0]
        if path in ("/", "/health"):
            self._json(
                200,
                {
                    "ok": True,
                    "service": "world-domination-x402-brief",
                    "mode": MODE,
                    "endpoints": ["/brief", "/health"],
                },
            )
            return
        if path != "/brief":
            self._json(404, {"error": "not found", "hint": "GET /brief"})
            return
        if MODE in ("402", "payment", "paid"):
            self._json(402, PAYMENT_REQUIRED)
            return
        # default stub
        self._json(200, DAY_BRIEF)


def main() -> None:
    httpd = HTTPServer((HOST, PORT), Handler)
    print(f"x402 brief scaffold listening on http://{HOST}:{PORT}  X402_MODE={MODE}")
    print("  GET /brief   GET /health")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
