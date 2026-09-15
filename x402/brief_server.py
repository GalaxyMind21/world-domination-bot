#!/usr/bin/env python3
"""Minimal x402 GET /brief twin scaffold (stdlib only).

Default X402_MODE=stub returns a free sample brief.
X402_MODE=402 returns HTTP 402 with PAYMENT-REQUIRED header (base64 JSON)
plus a human-readable JSON body. Does not call PayAI verify/settle by default.
Optional read-only GET /supported docs live in facilitator_wire.md.
"""
from __future__ import annotations

import base64
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

RECEIVE = "C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC"
USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
HOST = os.environ.get("X402_HOST", "127.0.0.1")
PORT = int(os.environ.get("X402_PORT", "8787"))
MODE = os.environ.get("X402_MODE", "stub").strip().lower()

# Observed 2026-09-15 via free GET https://facilitator.payai.network/supported
NETWORK_V1 = "solana"
NETWORK_V2 = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
FACILITATOR_BASE = "https://facilitator.payai.network"

DAY_BRIEF = {
    "title": "World Domination Day Brief",
    "as_of": "2026-09-15",
    "operator": "Galaxy Mind",
    "inbox": "world-domination@agentmail.to",
    "hq": "https://github.com/GalaxyMind21/world-domination-bot",
    "body": (
        "World's Fair Day 2: World Domination bot wires a PayAI free-tier "
        "facilitator-compatible layer into the x402 scaffold (PAYMENT-REQUIRED "
        "header + /verify stub). Stub mode still serves this free sample; 402 mode "
        "emits protocol-shaped headers without calling POST /verify or /settle. "
        "PayAI free-tier confirm stands from 2026-09-13. Capital stays 0 until "
        "on-chain seed lands."
    ),
    "mode": "stub",
    "note": "Sample payload for judges/builders. Not a paid settlement receipt.",
    "facilitator_wire": "see x402/facilitator_wire.md",
}

# Protocol-shaped payment requirement (x402 v1 exact / solana) — for header + body.
PAYMENT_REQUIRED = {
    "x402Version": 1,
    "error": "Payment Required",
    "accepts": [
        {
            "scheme": "exact",
            "network": NETWORK_V1,
            "maxAmountRequired": "1000000",
            "resource": "/brief",
            "description": "World Domination Day Brief (HTTP twin of DAYPASS email utility)",
            "mimeType": "application/json",
            "payTo": RECEIVE,
            "maxTimeoutSeconds": 60,
            "asset": USDC_MINT,
            "extra": {
                "assetSymbol": "USDC",
                "maxAmountRequiredHuman": "1.00 USDC",
                "networkV2": NETWORK_V2,
            },
        }
    ],
    "facilitator_path": {
        "provider": "PayAI",
        "base": FACILITATOR_BASE,
        "endpoints": {
            "supported": "GET /supported",
            "verify": "POST /verify",
            "settle": "POST /settle",
        },
        "tier": "free (confirmed 2026-09-13; enough until ~1000 settlements; no API key required for demo exact)",
        "docs": [
            "https://docs.payai.network/x402/reference",
            "https://docs.payai.network/x402/servers/typescript/manual-flow",
            "https://docs.payai.network/x402/quickstart",
        ],
        "note": (
            "Default scaffold mode does not call POST /verify or /settle. "
            "Wire live facilitator later per facilitator_wire.md."
        ),
    },
}


def _payment_required_b64() -> str:
    raw = json.dumps(PAYMENT_REQUIRED, separators=(",", ":")).encode("utf-8")
    return base64.b64encode(raw).decode("ascii")


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:  # quieter local demo
        sys_stderr = __import__("sys").stderr
        sys_stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def _json(self, code: int, payload: dict, extra_headers: dict | None = None) -> None:
        raw = json.dumps(payload, indent=2).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        if extra_headers:
            for k, v in extra_headers.items():
                self.send_header(k, v)
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
                    "endpoints": ["/brief", "/verify", "/health"],
                    "facilitator": FACILITATOR_BASE,
                    "live_facilitator_calls": False,
                },
            )
            return
        if path == "/verify":
            # Honest offline verify stub — never settles.
            self._json(
                200,
                {
                    "ok": False,
                    "settled": False,
                    "mode": MODE,
                    "status": "not_settled",
                    "message": (
                        "not settled — wire facilitator later "
                        f"(POST {FACILITATOR_BASE}/verify then /settle). "
                        "Default X402_MODE does not call PayAI."
                    ),
                    "hint": "Set X402_MODE=live only after documenting keys/credits policy; still prefer free tier.",
                    "accepts_network_v1": NETWORK_V1,
                    "accepts_network_v2": NETWORK_V2,
                    "payTo": RECEIVE,
                    "asset": USDC_MINT,
                },
            )
            return
        if path != "/brief":
            self._json(404, {"error": "not found", "hint": "GET /brief or GET /verify"})
            return
        if MODE in ("402", "payment", "paid"):
            self._json(
                402,
                PAYMENT_REQUIRED,
                extra_headers={
                    "PAYMENT-REQUIRED": _payment_required_b64(),
                    "Accept-Payment": "x402",
                },
            )
            return
        # default stub
        self._json(200, DAY_BRIEF)

    def do_POST(self) -> None:  # noqa: N802
        path = self.path.split("?", 1)[0]
        length = int(self.headers.get("Content-Length") or 0)
        if length > 1_000_000:
            self._json(413, {"error": "payload too large"})
            return
        _body = self.rfile.read(length) if length else b""
        if path == "/verify":
            # Echo that a PAYMENT-SIGNATURE may have been presented, but do not settle.
            sig_present = bool(self.headers.get("PAYMENT-SIGNATURE") or self.headers.get("Payment-Signature"))
            self._json(
                200,
                {
                    "ok": False,
                    "settled": False,
                    "mode": MODE,
                    "status": "not_settled",
                    "payment_signature_header_seen": sig_present,
                    "message": (
                        "not settled — wire facilitator later. "
                        "This stub does not POST to PayAI /verify or /settle."
                    ),
                    "next": {
                        "verify": f"POST {FACILITATOR_BASE}/verify",
                        "settle": f"POST {FACILITATOR_BASE}/settle",
                        "docs": "x402/facilitator_wire.md",
                    },
                },
            )
            return
        self._json(404, {"error": "not found", "hint": "POST /verify"})


def main() -> None:
    httpd = HTTPServer((HOST, PORT), Handler)
    print(f"x402 brief scaffold listening on http://{HOST}:{PORT}  X402_MODE={MODE}")
    print("  GET /brief   GET|POST /verify   GET /health")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
