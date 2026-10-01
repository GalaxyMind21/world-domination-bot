const { DAY_BRIEF, PAYMENT_REQUIRED, paymentRequiredB64 } = require("./_lib");
const { SETTLE_ON, tryVerifySettle, headerGet } = require("./_settle");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const q = (req.query && (req.query.mode || req.query.X402_MODE)) || "";
  const mode = String(q || process.env.X402_MODE || "stub").toLowerCase();
  const want402 = mode === "402" || mode === "payment" || mode === "paid";
  const sig =
    headerGet(req, "payment-signature") ||
    headerGet(req, "PAYMENT-SIGNATURE");

  // Paid retry path: only when kill-switch on AND signature present.
  if (want402 && SETTLE_ON() && sig) {
    const result = await tryVerifySettle(req);
    if (result.settled) {
      if (result.payment_response) {
        res.setHeader(
          "PAYMENT-RESPONSE",
          Buffer.from(JSON.stringify(result.payment_response)).toString(
            "base64"
          )
        );
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      const brief = Object.assign({}, DAY_BRIEF, {
        mode: "settled",
        as_of: "2026-10-01",
        note: "Settled via PayAI facilitator (X402_SETTLE=1, Base Sepolia). Not Capital.",
        settle: {
          transaction:
            (result.payment_response && result.payment_response.transaction) ||
            null,
          network:
            (result.payment_response && result.payment_response.network) ||
            "base-sepolia",
          payer:
            (result.payment_response && result.payment_response.payer) || null,
        },
      });
      return res.end(JSON.stringify(brief, null, 2));
    }
    // Kill-switch on but settle failed → still challenge (honest).
    res.statusCode = 402;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("PAYMENT-REQUIRED", paymentRequiredB64());
    res.setHeader("Accept-Payment", "x402");
    const body = Object.assign({}, PAYMENT_REQUIRED, {
      settle_attempt: {
        settled: false,
        status: result.status,
        message: result.message,
      },
    });
    return res.end(JSON.stringify(body, null, 2));
  }

  if (want402) {
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
