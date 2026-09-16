const { DAY_BRIEF, PAYMENT_REQUIRED, paymentRequiredB64 } = require("./_lib");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  const q = (req.query && (req.query.mode || req.query.X402_MODE)) || "";
  const mode = String(q || process.env.X402_MODE || "stub").toLowerCase();
  if (mode === "402" || mode === "payment" || mode === "paid") {
    res.statusCode = 402;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("PAYMENT-REQUIRED", paymentRequiredB64());
    res.setHeader("Accept-Payment", "x402");
    return res.end(JSON.stringify(PAYMENT_REQUIRED, null, 2));
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.end(JSON.stringify(DAY_BRIEF, null, 2));
};
