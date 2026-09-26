// World Domination x402 brief scaffold — payee + network config.
// Day 26: primary rail = Base Sepolia (testnet first) → Coinbase agentic EVM receive.
// Solana mainnet USDC kept as secondary accept. Mainnet Base is next after testnet settle path proves.
// Env overrides (optional): X402_PAYTO, X402_NETWORK, X402_ASSET, X402_AMOUNT

const RECEIVE_SOLANA = "C5K6JjM4NCYFUgmWDsMujQGqxDa9PzjjQhgUFJAPSSGC";
const USDC_SOLANA = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const NETWORK_SOLANA_V1 = "solana";
const NETWORK_SOLANA_V2 = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";

const RECEIVE_EVM =
  process.env.X402_PAYTO ||
  "0xD8436B7afD09E10704931E17FBC79dE71BF944C9";
const NETWORK_BASE_SEPOLIA = "base-sepolia";
const NETWORK_BASE_SEPOLIA_CAIP2 = "eip155:84532";
const USDC_BASE_SEPOLIA = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const NETWORK_BASE_MAINNET = "base";
const NETWORK_BASE_MAINNET_CAIP2 = "eip155:8453";
const USDC_BASE_MAINNET = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const ACTIVE_NETWORK = (
  process.env.X402_NETWORK || NETWORK_BASE_SEPOLIA
).toLowerCase();
const ACTIVE_ASSET =
  process.env.X402_ASSET ||
  (ACTIVE_NETWORK === "base" || ACTIVE_NETWORK === NETWORK_BASE_MAINNET
    ? USDC_BASE_MAINNET
    : USDC_BASE_SEPOLIA);
const AMOUNT = process.env.X402_AMOUNT || "1000000"; // 1.00 USDC (6 decimals)

const FACILITATOR_BASE = "https://facilitator.payai.network";

const DAY_BRIEF = {
  title: "World Domination Day Brief",
  as_of: "2026-09-26",
  operator: "Galaxy Mind",
  inbox: "world-domination@agentmail.to",
  hq: "https://github.com/GalaxyMind21/world-domination-bot",
  body:
    "Day 26: World Domination bot points the live x402 demo payTo at the Coinbase agentic EVM receive wallet on Base Sepolia (testnet first). Solana USDC accept remains as a second rail. Stub mode still serves this free sample; 402 mode emits protocol-shaped headers without calling POST /verify or /settle. Capital stays 0 until intentional on-chain seed lands. Mainnet Base is next after the testnet settle path proves.",
  mode: "stub",
  note: "Sample payload for judges/builders. Not a paid settlement receipt.",
  facilitator_wire: "see x402/facilitator_wire.md on HQ",
  receive: {
    evm_base_sepolia: RECEIVE_EVM,
    solana: RECEIVE_SOLANA,
    primary_network: ACTIVE_NETWORK,
  },
};

function buildAccepts() {
  const primaryIsBase =
    ACTIVE_NETWORK === "base-sepolia" ||
    ACTIVE_NETWORK === "base" ||
    ACTIVE_NETWORK.startsWith("eip155:845");

  const baseAccept = {
    scheme: "exact",
    network:
      ACTIVE_NETWORK === "base" ? NETWORK_BASE_MAINNET : NETWORK_BASE_SEPOLIA,
    maxAmountRequired: AMOUNT,
    resource: "/api/brief",
    description:
      "World Domination Day Brief (HTTP twin of DAYPASS email utility)",
    mimeType: "application/json",
    payTo: RECEIVE_EVM,
    maxTimeoutSeconds: 60,
    asset: ACTIVE_ASSET,
    extra: {
      assetSymbol: "USDC",
      maxAmountRequiredHuman: "1.00 USDC",
      name: "USDC",
      version: "2",
      networkV2:
        ACTIVE_NETWORK === "base"
          ? NETWORK_BASE_MAINNET_CAIP2
          : NETWORK_BASE_SEPOLIA_CAIP2,
      rail: ACTIVE_NETWORK === "base" ? "base-mainnet" : "base-sepolia",
      note:
        ACTIVE_NETWORK === "base"
          ? "Mainnet Base USDC — only after testnet settle path proves."
          : "Base Sepolia testnet first (Day 26). Mainnet Base next after settle path proves.",
    },
  };

  const solanaAccept = {
    scheme: "exact",
    network: NETWORK_SOLANA_V1,
    maxAmountRequired: AMOUNT,
    resource: "/api/brief",
    description:
      "World Domination Day Brief (Solana USDC secondary rail)",
    mimeType: "application/json",
    payTo: RECEIVE_SOLANA,
    maxTimeoutSeconds: 60,
    asset: USDC_SOLANA,
    extra: {
      assetSymbol: "USDC",
      maxAmountRequiredHuman: "1.00 USDC",
      networkV2: NETWORK_SOLANA_V2,
      rail: "solana-mainnet",
      note: "Secondary accept; Solana treasury still listed on capital board.",
    },
  };

  // Primary first for clients that take accepts[0]
  if (primaryIsBase) {
    return [baseAccept, solanaAccept];
  }
  return [solanaAccept, baseAccept];
}

const PAYMENT_REQUIRED = {
  x402Version: 1,
  error: "Payment Required",
  accepts: buildAccepts(),
  facilitator_path: {
    provider: "PayAI",
    base: FACILITATOR_BASE,
    endpoints: {
      supported: "GET /supported",
      verify: "POST /verify",
      settle: "POST /settle",
    },
    tier: "free (confirmed 2026-09-13; enough until ~1000 settlements; no API key required for demo exact)",
    note: "Default scaffold mode does not call POST /verify or /settle. Day 26 primary accept is Base Sepolia → EVM receive.",
  },
};

function paymentRequiredB64() {
  return Buffer.from(JSON.stringify(PAYMENT_REQUIRED)).toString("base64");
}

module.exports = {
  RECEIVE: RECEIVE_EVM,
  RECEIVE_EVM,
  RECEIVE_SOLANA,
  USDC_MINT: ACTIVE_ASSET,
  USDC_BASE_SEPOLIA,
  USDC_BASE_MAINNET,
  USDC_SOLANA,
  NETWORK_V1: ACTIVE_NETWORK === "base" ? NETWORK_BASE_MAINNET : NETWORK_BASE_SEPOLIA,
  NETWORK_V2:
    ACTIVE_NETWORK === "base"
      ? NETWORK_BASE_MAINNET_CAIP2
      : NETWORK_BASE_SEPOLIA_CAIP2,
  NETWORK_BASE_SEPOLIA,
  NETWORK_SOLANA_V1,
  FACILITATOR_BASE,
  DAY_BRIEF,
  PAYMENT_REQUIRED,
  paymentRequiredB64,
};
