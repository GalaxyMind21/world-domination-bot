const {
  FACILITATOR_BASE,
  RECEIVE_EVM,
  RECEIVE_SOLANA,
  NETWORK_V1,
  USDC_MINT,
} = require("./_lib");
const { SETTLE_ON } = require("./_settle");
const { CANONICAL_URL, REQUIREMENTS, TESTNET } = require("./_v2");

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
        as_of: "2026-10-08",
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
        discovery: { openapi: "/openapi.json", well_known: "/.well-known/x402", bazaar_extension: true },
        canonical_paid_resource: CANONICAL_URL,
        x402: {
          canonical: { version: 2, url: CANONICAL_URL, network: REQUIREMENTS.network, asset: REQUIREMENTS.asset, amount: REQUIREMENTS.amount, testnet: TESTNET },
          legacy: { version: 1, url: "/api/brief?mode=402", deprecated: true },
        },
        facilitator: FACILITATOR_BASE,
        live_facilitator_calls: settleOn,
        x402_settle_env: process.env.X402_SETTLE || "0",
        settle_kill_switch: settleOn ? "on" : "off",
        capital: 0,
        mint_live: false,
        // settle_live mirrors kill-switch; production must leave X402_SETTLE unset/0.
        settle_live: settleOn,
        primary_network: NETWORK_V1,
        payTo: RECEIVE_EVM,
        asset: USDC_MINT,
        receive_addresses: {
          evm_base: RECEIVE_EVM,
          solana: RECEIVE_SOLANA,
        },
        mainnet_ready: { env: "X402_V2_NETWORK=base", active: !TESTNET, note: "x402scan indexes Base mainnet + Solana only; default stays Base Sepolia until the operator says go." },
        note: "Day 38: canonical v2 accept is mainnet-ready behind X402_V2_NETWORK=base (default off, Base Sepolia). Settle kill-switch still default off. Capital stays 0 until intentional seed.",
      },
      null,
      2
    )
  );
};
