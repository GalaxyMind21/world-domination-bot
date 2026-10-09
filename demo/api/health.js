const {
  FACILITATOR_BASE,
  RECEIVE_EVM,
  RECEIVE_SOLANA,
  NETWORK_V1,
  USDC_MINT,
} = require("./_lib");
const { SETTLE_ON } = require("./_settle");
const { CANONICAL_URL, REQUIREMENTS, TESTNET } = require("./_v2");

const X402SCAN_LISTING = "https://www.x402scan.com/server/792302a9-0547-43f5-8bcf-471b10d7dc10";

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  const settleOn = SETTLE_ON();
  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        ok: true,
        service: "world-domination-x402-brief",
        as_of: "2026-10-09",
        mode: process.env.X402_MODE || "stub",
        endpoints: [
          "/api/paid-brief",
          "/api/brief",
          "/api/brief?mode=402",
          "/api/verify",
          "/api/health",
          "/openapi.json",
          "/.well-known/x402",
        ],
        discovery: { openapi: "/openapi.json", well_known: "/.well-known/x402", bazaar_extension: true, listings: { x402scan: X402SCAN_LISTING } },
        canonical_paid_resource: CANONICAL_URL,
        x402: {
          canonical: { version: 2, url: CANONICAL_URL, network: REQUIREMENTS.network, asset: REQUIREMENTS.asset, amount: REQUIREMENTS.amount, testnet: TESTNET },
          legacy: { version: 1, url: "/api/brief?mode=402", deprecated: true, network: NETWORK_V1, asset: USDC_MINT },
        },
        facilitator: FACILITATOR_BASE,
        live_facilitator_calls: settleOn,
        x402_settle_env: process.env.X402_SETTLE || "0",
        settle_kill_switch: settleOn ? "on" : "off",
        capital: 0,
        mint_live: false,
        // settle_live mirrors kill-switch; production must leave X402_SETTLE unset/0.
        settle_live: settleOn,
        // Day 39: top-level fields mirror the canonical v2 accept (legacy v1 values live under x402.legacy).
        primary_network: REQUIREMENTS.network,
        primary_network_label: TESTNET ? "Base Sepolia (testnet)" : "Base mainnet",
        payTo: REQUIREMENTS.payTo,
        asset: REQUIREMENTS.asset,
        receive_addresses: {
          evm_base: RECEIVE_EVM,
          solana: RECEIVE_SOLANA,
        },
        mainnet_ready: { env: "X402_V2_NETWORK=base", active: !TESTNET, note: TESTNET ? "Canonical v2 accept is on Base Sepolia (code default). X402_V2_NETWORK=base switches it to Base mainnet USDC." : "Canonical v2 accept is on Base mainnet USDC (operator yes 2026-10-08). Code default without the env stays Base Sepolia." },
        note: TESTNET
          ? "Canonical v2 accept on Base Sepolia (testnet). Settle kill-switch off: no payment is executed. Capital stays 0 until intentional seed."
          : "Canonical v2 accept on Base mainnet USDC, listed on x402scan. Settle kill-switch off: payments are advertised but not executed. Capital stays 0 until intentional seed.",
      },
      null,
      2
    )
  );
};
