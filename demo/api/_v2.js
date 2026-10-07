// x402 v2 canonical paid resource (Day 35).
// One canonical paid URL: the URL that challenges is the URL that serves the paid brief,
// and PaymentRequired.resource.url names exactly that URL.
// Spec: https://github.com/coinbase/x402/blob/main/specs/x402-specification-v2.md
// Settle stays behind the Day-31 kill-switch (X402_SETTLE=1), Base Sepolia only.

const crypto = require("crypto");
const {
  RECEIVE_EVM,
  USDC_BASE_SEPOLIA,
  FACILITATOR_BASE,
  DAY_BRIEF,
} = require("./_lib");

const PUBLIC_BASE = (
  process.env.X402_PUBLIC_BASE || "https://world-domination-x402.vercel.app"
).replace(/\/$/, "");
const CANONICAL_PATH = "/api/paid-brief";
const CANONICAL_URL = PUBLIC_BASE + CANONICAL_PATH;
const NETWORK = "eip155:84532"; // Base Sepolia (CAIP-2)
const AMOUNT = process.env.X402_AMOUNT || "1000000"; // 1.00 USDC, 6 decimals
const EXT_NAME = "wd-receipt-binding";

const RESOURCE = {
  url: CANONICAL_URL,
  description: "World Domination Day Brief (paid, x402 v2, Base Sepolia USDC)",
  mimeType: "application/json",
};

const REQUIREMENTS = {
  scheme: "exact",
  network: NETWORK,
  amount: AMOUNT,
  asset: USDC_BASE_SEPOLIA,
  payTo: RECEIVE_EVM,
  maxTimeoutSeconds: 60,
  extra: { name: "USDC", version: "2" },
};

const RECEIPT_EXTENSION = {
  info: {
    idempotencyKey: "payload.authorization.nonce",
    receiptId:
      "sha256(resource.url|accepted.network|accepted.asset|accepted.payTo|accepted.amount|payload.authorization.nonce)",
    bindingFields: [
      "resource.url",
      "accepted.network",
      "accepted.asset",
      "accepted.payTo",
      "accepted.amount",
      "payload.authorization.nonce",
    ],
    receiptHeader: "PAYMENT-RESPONSE",
    receiptBodyField: "receipt",
    note:
      "Requirements are server-authoritative: a payload whose accepted terms differ from this challenge is rejected before any facilitator call. Replay protection is the EIP-3009 nonce, enforced on-chain.",
  },
};


// Day 37: x402 v2 `bazaar` discovery extension (specs/extensions/bazaar.md) so facilitators
// and indexers (e.g. x402scan) can catalog this endpoint as invocable: GET, no params, JSON out.
const BAZAAR_EXTENSION = {
  info: {
    input: { type: "http", method: "GET", queryParams: {} },
    output: {
      type: "json",
      example: {
        title: "World Domination Day Brief",
        operator: "Galaxy Mind",
        mode: "settled",
        receipt: { id: "<sha256 hex>", network: NETWORK, amount: AMOUNT },
      },
    },
  },
  schema: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    type: "object",
    properties: {
      input: {
        type: "object",
        properties: {
          type: { type: "string", const: "http" },
          method: { type: "string", enum: ["GET"] },
          queryParams: { type: "object", properties: {}, additionalProperties: false },
        },
        required: ["type", "method"],
        additionalProperties: false,
      },
      output: {
        type: "object",
        properties: { type: { type: "string" }, example: { type: "object" } },
        required: ["type"],
      },
    },
    required: ["input"],
  },
};

function paymentRequired(error) {
  return {
    x402Version: 2,
    error: error || "PAYMENT-SIGNATURE header is required",
    resource: RESOURCE,
    accepts: [REQUIREMENTS],
    extensions: { bazaar: BAZAAR_EXTENSION, [EXT_NAME]: RECEIPT_EXTENSION },
  };
}

function b64(obj) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

function receiptId(nonce) {
  return crypto
    .createHash("sha256")
    .update(
      [
        RESOURCE.url,
        REQUIREMENTS.network,
        REQUIREMENTS.asset.toLowerCase(),
        REQUIREMENTS.payTo.toLowerCase(),
        REQUIREMENTS.amount,
        String(nonce || "").toLowerCase(),
      ].join("|")
    )
    .digest("hex");
}

const eqAddr = (a, b) =>
  typeof a === "string" && typeof b === "string" && a.toLowerCase() === b.toLowerCase();

// Returns null when the payload matches this challenge, else a reason string.
function mismatch(payload) {
  if (!payload || typeof payload !== "object") return "payload_not_object";
  if (payload.x402Version !== 2) return "x402Version_must_be_2";
  const a = payload.accepted || {};
  if (a.scheme !== REQUIREMENTS.scheme) return "scheme_mismatch";
  if (a.network !== REQUIREMENTS.network) return "network_mismatch";
  if (String(a.amount) !== REQUIREMENTS.amount) return "amount_mismatch";
  if (!eqAddr(a.asset, REQUIREMENTS.asset)) return "asset_mismatch";
  if (!eqAddr(a.payTo, REQUIREMENTS.payTo)) return "payTo_mismatch";
  if (payload.resource && payload.resource.url && payload.resource.url !== RESOURCE.url)
    return "resource_url_mismatch";
  const auth = payload.payload && payload.payload.authorization;
  if (!auth || !auth.nonce) return "missing_authorization_nonce";
  if (!eqAddr(auth.to, REQUIREMENTS.payTo)) return "authorization_to_mismatch";
  if (String(auth.value) !== REQUIREMENTS.amount) return "authorization_value_mismatch";
  return null;
}

async function facilitatorPost(path, body) {
  const res = await fetch(FACILITATOR_BASE.replace(/\/$/, "") + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (_) {
    json = { raw: text };
  }
  return { http: res.status, json };
}

// Only called when kill-switch is ON and a signature is present.
async function verifyAndSettle(payload) {
  const reason = mismatch(payload);
  if (reason) return { settled: false, facilitator_called: false, status: "rejected", reason };
  const body = { x402Version: 2, paymentPayload: payload, paymentRequirements: REQUIREMENTS };
  try {
    const verify = await facilitatorPost("/verify", body);
    if (!(verify.json && verify.json.isValid === true)) {
      return {
        settled: false,
        facilitator_called: true,
        status: "verify_failed",
        reason: (verify.json && verify.json.invalidReason) || "verify_not_valid",
      };
    }
    const settle = await facilitatorPost("/settle", body);
    if (!(settle.json && settle.json.success === true)) {
      return {
        settled: false,
        facilitator_called: true,
        status: "settle_failed",
        reason: (settle.json && settle.json.errorReason) || "settle_not_success",
      };
    }
    const nonce = payload.payload.authorization.nonce;
    return {
      settled: true,
      facilitator_called: true,
      status: "settled",
      payment_response: {
        success: true,
        transaction: settle.json.transaction || "",
        network: settle.json.network || NETWORK,
        payer: settle.json.payer || verify.json.payer || payload.payload.authorization.from,
      },
      receipt: {
        id: receiptId(nonce),
        nonce,
        resource: RESOURCE.url,
        network: NETWORK,
        asset: REQUIREMENTS.asset,
        payTo: REQUIREMENTS.payTo,
        amount: REQUIREMENTS.amount,
        transaction: settle.json.transaction || "",
      },
    };
  } catch (err) {
    return {
      settled: false,
      facilitator_called: true,
      status: "facilitator_error",
      reason: err && err.message ? err.message : String(err),
    };
  }
}

function paidBrief(result) {
  return Object.assign({}, DAY_BRIEF, {
    mode: "settled",
    note: "Settled via PayAI facilitator on Base Sepolia (testnet). Not operating Capital.",
    receipt: result.receipt,
  });
}

module.exports = {
  CANONICAL_URL,
  CANONICAL_PATH,
  RESOURCE,
  REQUIREMENTS,
  EXT_NAME,
  BAZAAR_EXTENSION,
  NETWORK,
  AMOUNT,
  PUBLIC_BASE,
  paymentRequired,
  b64,
  receiptId,
  mismatch,
  verifyAndSettle,
  paidBrief,
};
