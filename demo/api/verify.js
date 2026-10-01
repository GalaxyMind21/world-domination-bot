const {
  RECEIVE,
  USDC_MINT,
  NETWORK_V1,
  NETWORK_V2,
  FACILITATOR_BASE,
} = require("./_lib");
const { SETTLE_ON, tryVerifySettle, stubBody } = require("./_settle");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  // Default path: honest stub. Never call facilitator unless X402_SETTLE=1.
  if (!SETTLE_ON()) {
    const body = stubBody(req);
    body.accepts_network_v1 = NETWORK_V1;
    body.accepts_network_v2 = NETWORK_V2;
    body.payTo = RECEIVE;
    body.asset = USDC_MINT;
    body.facilitator = FACILITATOR_BASE;
    res.statusCode = 200;
    return res.end(JSON.stringify(body, null, 2));
  }

  const result = await tryVerifySettle(req);
  if (result.payment_response) {
    res.setHeader(
      "PAYMENT-RESPONSE",
      Buffer.from(JSON.stringify(result.payment_response)).toString("base64")
    );
  }
  res.statusCode = 200;
  return res.end(JSON.stringify(result, null, 2));
};
