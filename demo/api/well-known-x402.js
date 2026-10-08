// Day 37: /.well-known/x402 fan-out (x402scan compatibility discovery). Served via rewrite.
const { CANONICAL_URL, NETWORK_LABEL, TESTNET } = require("./_v2");

function doc() {
  return {
    version: 1,
    resources: [CANONICAL_URL],
    instructions:
      "Canonical x402 v2 paid resource. " + NETWORK_LABEL + (TESTNET ? " (testnet)" : "") +
      " USDC; check /api/health settle_live before paying. OpenAPI at /openapi.json.",
  };
}

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.statusCode = 200;
  res.end(JSON.stringify(doc(), null, 2));
};
module.exports.doc = doc;
