const RECEIVE = "C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const NETWORK_V1 = "solana";
const NETWORK_V2 = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";
const FACILITATOR_BASE = "https://facilitator.payai.network";

const DAY_BRIEF = {
  title: "World Domination Day Brief",
  as_of: "2026-09-15",
  operator: "Galaxy Mind",
  inbox: "world-domination@agentmail.to",
  hq: "https://github.com/GalaxyMind21/world-domination-bot",
  body:
    "World's Fair Day 2: World Domination bot wires a PayAI free-tier facilitator-compatible layer into the x402 scaffold (PAYMENT-REQUIRED header + /verify stub). Stub mode still serves this free sample; 402 mode emits protocol-shaped headers without calling POST /verify or /settle. PayAI free-tier confirm stands from 2026-09-13. Capital stays 0 until on-chain seed lands.",
  mode: "stub",
  note: "Sample payload for judges/builders. Not a paid settlement receipt.",
  facilitator_wire: "see x402/facilitator_wire.md on HQ",
};

const PAYMENT_REQUIRED = {
  x402Version: 1,
  error: "Payment Required",
  accepts: [
    {
      scheme: "exact",
      network: NETWORK_V1,
      maxAmountRequired: "1000000",
      resource: "/api/brief",
      description: "World Domination Day Brief (HTTP twin of DAYPASS email utility)",
      mimeType: "application/json",
      payTo: RECEIVE,
      maxTimeoutSeconds: 60,
      asset: USDC_MINT,
      extra: {
        assetSymbol: "USDC",
        maxAmountRequiredHuman: "1.00 USDC",
        networkV2: NETWORK_V2,
      },
    },
  ],
  facilitator_path: {
    provider: "PayAI",
    base: FACILITATOR_BASE,
    endpoints: {
      supported: "GET /supported",
      verify: "POST /verify",
      settle: "POST /settle",
    },
    tier: "free (confirmed 2026-09-13; enough until ~1000 settlements; no API key required for demo exact)",
    note: "Default scaffold mode does not call POST /verify or /settle.",
  },
};

function paymentRequiredB64() {
  return Buffer.from(JSON.stringify(PAYMENT_REQUIRED)).toString("base64");
}

module.exports = {
  RECEIVE,
  USDC_MINT,
  NETWORK_V1,
  NETWORK_V2,
  FACILITATOR_BASE,
  DAY_BRIEF,
  PAYMENT_REQUIRED,
  paymentRequiredB64,
};
