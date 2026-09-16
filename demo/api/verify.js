const { RECEIVE, USDC_MINT, NETWORK_V1, NETWORK_V2, FACILITATOR_BASE } = require("./_lib");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const sig =
    req.headers["payment-signature"] ||
    req.headers["PAYMENT-SIGNATURE"] ||
    false;
  const body = {
    ok: false,
    settled: false,
    mode: process.env.X402_MODE || "stub",
    status: "not_settled",
    payment_signature_header_seen: Boolean(sig),
    message:
      "not settled — wire facilitator later (POST " +
      FACILITATOR_BASE +
      "/verify then /settle). Default does not call PayAI.",
    accepts_network_v1: NETWORK_V1,
    accepts_network_v2: NETWORK_V2,
    payTo: RECEIVE,
    asset: USDC_MINT,
  };
  res.statusCode = 200;
  res.end(JSON.stringify(body, null, 2));
};
