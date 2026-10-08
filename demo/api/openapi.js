// Day 37: OpenAPI-first x402 discovery (x402scan docs/DISCOVERY.md precedence #1).
// Served at /openapi.json via vercel.json rewrite. Runtime 402 stays authoritative.
const { CANONICAL_PATH, REQUIREMENTS, RESOURCE, PUBLIC_BASE, TESTNET, NETWORK_LABEL } = require("./_v2");

function spec() {
  const human = (Number(REQUIREMENTS.amount) / 1e6).toFixed(2);
  return {
    openapi: "3.1.0",
    info: {
      title: "World Domination bot x402 Day Brief",
      version: "2026-10-08",
      description:
        "Agent-payable Day Brief from World Domination bot (operator: Galaxy Mind). x402 v2, " +
        NETWORK_LABEL + (TESTNET ? " (testnet)" : "") +
        " USDC. Check /api/health settle_live: while the settlement kill-switch is off the 402 challenge is live but no funds move.",
      "x-guidance":
        "GET /api/paid-brief with no parameters. Unpaid requests get HTTP 402 with an x402 v2 PAYMENT-REQUIRED header (base64 JSON). Pay " +
        human + " USDC on " + NETWORK_LABEL + " (" + REQUIREMENTS.network +
        ") with the exact scheme and retry with PAYMENT-SIGNATURE. Check /api/health settle_live before paying; when it is false, retries return 402 kill_switch_off and no funds move.",
      contact: { email: "world-domination@agentmail.to", url: "https://github.com/GalaxyMind21/world-domination-bot" },
    },
    servers: [{ url: PUBLIC_BASE }],
    paths: {
      [CANONICAL_PATH]: {
        get: {
          operationId: "getPaidBrief",
          summary: RESOURCE.description,
          parameters: [],
          "x-payment-info": {
            price: { mode: "fixed", currency: "USD", amount: human },
            protocols: [
              {
                x402: {
                  version: 2,
                  scheme: REQUIREMENTS.scheme,
                  network: REQUIREMENTS.network,
                  asset: REQUIREMENTS.asset,
                  amount: REQUIREMENTS.amount,
                  payTo: REQUIREMENTS.payTo,
                  testnet: TESTNET,
                },
              },
            ],
          },
          responses: {
            200: {
              description: "Paid Day Brief with receipt (after a settled PAYMENT-SIGNATURE).",
              content: { "application/json": { schema: { type: "object" } } },
            },
            402: {
              description: "Payment required. x402 v2 PaymentRequired in the PAYMENT-REQUIRED header (base64 JSON) and body.",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
      "/api/health": {
        get: {
          operationId: "getHealth",
          summary: "Free service health (settle_live, canonical paid URL).",
          security: [],
          responses: { 200: { description: "OK", content: { "application/json": { schema: { type: "object" } } } } },
        },
      },
    },
  };
}

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.statusCode = 200;
  res.end(JSON.stringify(spec(), null, 2));
};
module.exports.spec = spec;
