// Canonical paid resource (x402 v2). Unpaid → 402 + PAYMENT-REQUIRED (v2).
// Paid retry → verify+settle only when X402_SETTLE=1 (kill-switch, default off).
const { SETTLE_ON, headerGet, decodePaymentSignature } = require("./_settle");
const { paymentRequired, b64, verifyAndSettle, paidBrief } = require("./_v2");

function challenge(res, error, extra) {
  const pr = paymentRequired(error);
  res.statusCode = 402;
  res.setHeader("PAYMENT-REQUIRED", b64(pr));
  return res.end(JSON.stringify(Object.assign({}, pr, extra || {}), null, 2));
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Expose-Headers",
    "PAYMENT-REQUIRED, PAYMENT-RESPONSE"
  );
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Headers", "PAYMENT-SIGNATURE, Content-Type");
    res.statusCode = 204;
    return res.end();
  }

  const sig = headerGet(req, "payment-signature");
  if (!sig) return challenge(res);

  if (!SETTLE_ON()) {
    return challenge(res, "Settlement is disabled on this deployment (kill-switch off).", {
      settle_attempt: { settled: false, facilitator_called: false, status: "kill_switch_off" },
    });
  }

  const payload = decodePaymentSignature(sig);
  if (!payload) {
    return challenge(res, "PAYMENT-SIGNATURE could not be decoded", {
      settle_attempt: { settled: false, facilitator_called: false, status: "invalid_payment_signature" },
    });
  }

  const result = await verifyAndSettle(payload);
  if (!result.settled) {
    return challenge(res, "Payment not accepted: " + (result.reason || result.status), {
      settle_attempt: result,
    });
  }
  res.setHeader("PAYMENT-RESPONSE", b64(result.payment_response));
  res.statusCode = 200;
  return res.end(JSON.stringify(paidBrief(result), null, 2));
};
