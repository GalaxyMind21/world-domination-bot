const {
  FACILITATOR_BASE,
  RECEIVE_EVM,
  RECEIVE_SOLANA,
  NETWORK_V1,
  USDC_MINT,
} = require("./_lib");

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        ok: true,
        service: "world-domination-x402-brief",
        as_of: "2026-09-26",
        mode: process.env.X402_MODE || "stub",
        endpoints: [
          "/api/brief",
          "/api/brief?mode=402",
          "/api/verify",
          "/api/health",
        ],
        facilitator: FACILITATOR_BASE,
        live_facilitator_calls: false,
        capital: 0,
        mint_live: false,
        settle_live: false,
        primary_network: NETWORK_V1,
        payTo: RECEIVE_EVM,
        asset: USDC_MINT,
        receive_addresses: {
          evm_base: RECEIVE_EVM,
          solana: RECEIVE_SOLANA,
        },
        note: "Day 26: primary 402 accept is Base Sepolia (testnet first). Mainnet Base next after settle path proves. Capital stays 0 until intentional seed.",
      },
      null,
      2
    )
  );
};
