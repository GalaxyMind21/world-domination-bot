const {
  FACILITATOR_BASE,
  RECEIVE_EVM,
  RECEIVE_SOLANA,
  NETWORK_V1,
  USDC_MINT,
} = require("./_lib");
const { SETTLE_ON } = require("./_settle");
const { CANONICAL_URL, REQUIREMENTS } = require("./_v2");

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
        as_of: "2026-10-05",
        mode: process.env.X402_MODE || "stub",
        endpoints: [
          "/api/paid-brief",
          "/api/brief",
          "/api/brief?mode=402",
          "/api/verify",
          "/api/health",
        ],
        canonical_paid_resource: CANONICAL_URL,
        x402: {
          canonical: { version: 2, url: CANONICAL_URL, network: REQUIREMENTS.network, amount: REQUIREMENTS.amount },
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
        note: "Day 35: canonical paid resource /api/paid-brief emits x402 v2 (resource.url matches the challenging URL); legacy v1 /api/brief?mode=402 kept and marked deprecated. Settle kill-switch still default off; Base Sepolia only. Capital stays 0 until intentional seed.",
      },
      null,
      2
    )
  );
};
