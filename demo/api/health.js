const { FACILITATOR_BASE } = require("./_lib");
module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        ok: true,
        service: "world-domination-x402-brief",
        mode: process.env.X402_MODE || "stub",
        endpoints: ["/api/brief", "/api/brief?mode=402", "/api/verify", "/api/health"],
        facilitator: FACILITATOR_BASE,
        live_facilitator_calls: false,
        capital: 0,
        mint_live: false,
        settle_live: false,
      },
      null,
      2
    )
  );
};
