#!/usr/bin/env python3
"""Minimal x402 GET /brief twin scaffold (stdlib only).

Default X402_MODE=stub returns a free sample brief.
X402_MODE=402 returns HTTP 402 with PAYMENT-REQUIRED header (base64 JSON)
plus a human-readable JSON body. Does not call PayAI verify/settle by default.
Day 26: primary accept is Base Sepolia → EVM receive (testnet first);
Solana USDC remains a secondary accept.
"""
from __future__ import annotations

import base64
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

RECEIVE_SOLANA = "C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC"
USDC_SOLANA = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
NETWORK_SOLANA_V1 = "solana"
NETWORK_SOLANA_V2 = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"

RECEIVE_EVM = os.environ.get(
    "X402_PAYTO", "0xD8436B7afD09E10704931E17FBC79dE71BF944C9"
)
NETWORK_BASE_SEPOLIA = "base-sepolia"
NETWORK_BASE_SEPOLIA_CAIP2 = "eip155:84532"
USDC_BASE_SEPOLIA = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"

RECEIVE = RECEIVE_EVM  # primary
USDC_MINT = USDC_BASE_SEPOLIA
HOST = os.environ.get("X402_HOST", "127.0.0.1")
PORT = int(os.environ.get("X402_PORT", "8787"))
MODE = os.environ.get("X402_MODE", "stub").strip().lower()

NETWORK_V1 = os.environ.get("X402_NETWORK", NETWORK_BASE_SEPOLIA).strip().lower()
NETWORK_V2 = NETWORK_BASE_SEPOLIA_CAIP2
FACILITATOR_BASE = "https://facilitator.payai.network"

DAY_BRIEF = {
    "title": "World Domination Day Brief",
    "as_of": "2026-09-26",
    "operator": "Galaxy Mind",
    "inbox": "world-domination@agentmail.to",
    "hq": "https://github.com/GalaxyMind21/world-domination-bot",
    "body": (
        "Day 26: World Domination bot points the live x402 demo payTo at the "
        "Coinbase agentic EVM receive wallet on Base Sepolia (testnet first). "
        "Solana USDC accept remains as a second rail. Stub mode still serves "
        "this free sample; 402 mode emits protocol-shaped headers without "
        "calling POST /verify or /settle. Capital stays 0 until intentional "
        "on-chain seed lands."
    ),
    "mode": "stub",
    "note": "Sample payload for judges/builders. Not a paid settlement receipt.",
    "facilitator_wire": "see x402/facilitator_wire.md",
    "receive": {"evm_base_sepolia": RECEIVE_EVM, "solana": RECEIVE_SOLANA},
}

PAYMENT_REQUIRED = {
    "x402Version": 1,
    "error": "Payment Required",
    "accepts": [
        {
            "scheme": "exact",
            "network": NETWORK_BASE_SEPOLIA,
            "maxAmountRequired": "1000000",
            "resource": "/brief",
            "description": "World Domination Day Brief (HTTP twin of DAYPASS email utility)",
            "mimeType": "application/json",
            "payTo": RECEIVE_EVM,
            "maxTimeoutSeconds": 60,
            "asset": USDC_BASE_SEPOLIA,
            "extra": {
                "assetSymbol": "USDC",
                "maxAmountRequiredHuman": "1.00 USDC",
                "name": "USDC",
                "version": "2",
                "networkV2": NETWORK_BASE_SEPOLIA_CAIP2,
                "rail": "base-sepolia",
                "note": "Base Sepolia testnet first (Day 26). Mainnet Base next after settle path proves.",
            },
        },
        {
            "scheme": "exact",
            "network": NETWORK_SOLANA_V1,
            "maxAmountRequired": "1000000",
            "resource": "/brief",
            "description": "World Domination Day Brief (Solana USDC secondary rail)",
            "mimeType": "application/json",
            "payTo": RECEIVE_SOLANA,
            "maxTimeoutSeconds": 60,
            "asset": USDC_SOLANA,
            "extra": {
                "assetSymbol": "USDC",
                "maxAmountRequiredHuman": "1.00 USDC",
                "networkV2": NETWORK_SOLANA_V2,
                "rail": "solana-mainnet",
            },
        },
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
            "Day 26 primary accept is Base Sepolia → EVM receive."
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
