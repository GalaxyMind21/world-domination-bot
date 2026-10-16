// X402_SETTLE kill-switch + thin PayAI verify→settle proxy (Base Sepolia + Base mainnet).
// Default OFF: never POST facilitator /verify or /settle unless process.env.X402_SETTLE === "1".
// Day 31 — G4 shipped; Day 46 — G9 allowlist ships eip155:8453 alongside Sepolia.
// G6 (funded test client) still blocked → do not flip live in prod.

const {
  FACILITATOR_BASE,
  RECEIVE_EVM,
  USDC_BASE_SEPOLIA,
  USDC_BASE_MAINNET,
  NETWORK_BASE_SEPOLIA,
  NETWORK_V2,
  PAYMENT_REQUIRED,
} = require("./_lib");

const SETTLE_ON = () => String(process.env.X402_SETTLE || "").trim() === "1";

// Day 46 G9: allow live v2 accept (Base mainnet) as well as legacy Sepolia.
const NETWORK_BASE_MAINNET = "base";
const NETWORK_BASE_MAINNET_CAIP2 = "eip155:8453";
const NETWORK_BASE_SEPOLIA_CAIP2 = "eip155:84532";

const ALLOWED_NETWORKS = new Set([
  "base-sepolia",
  NETWORK_BASE_SEPOLIA_CAIP2,
  NETWORK_BASE_SEPOLIA,
  "base",
  NETWORK_BASE_MAINNET,
  NETWORK_BASE_MAINNET_CAIP2,
  NETWORK_V2, // follows X402_NETWORK; may be sepolia or mainnet
]);

function headerGet(req, name) {
  const lower = name.toLowerCase();
  const h = req.headers || {};
  for (const k of Object.keys(h)) {
    if (k.toLowerCase() === lower) return h[k];
  }
  return undefined;
}

function decodePaymentSignature(raw) {
  if (!raw || typeof raw !== "string") return null;
  const s = raw.trim();
  // Prefer base64 (protocol); also accept raw JSON for local smoke.
  try {
    if (s.startsWith("{")) return JSON.parse(s);
    const json = Buffer.from(s, "base64").toString("utf8");
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

function isMainnetNetwork(network) {
  const n = String(network || "").toLowerCase();
  return n === "base" || n === "eip155:8453";
}

function primaryRequirementsFor(network) {
  const accepts = (PAYMENT_REQUIRED && PAYMENT_REQUIRED.accepts) || [];
  const wantMainnet = isMainnetNetwork(network);
  const primary =
    accepts.find((a) => {
      if (!a) return false;
      const net = String(a.network || "").toLowerCase();
      const v2 = a.extra && a.extra.networkV2;
      if (wantMainnet) {
        return (
          net === "base" ||
          net === "eip155:8453" ||
          v2 === "eip155:8453"
        );
      }
      return (
        net === "base-sepolia" ||
        net === "eip155:84532" ||
        v2 === "eip155:84532"
      );
    }) ||
    accepts.find(
      (a) =>
        a &&
        (a.network === "base-sepolia" ||
          a.network === "eip155:84532" ||
          a.network === "base" ||
          a.network === "eip155:8453" ||
          (a.extra &&
            (a.extra.networkV2 === "eip155:84532" ||
              a.extra.networkV2 === "eip155:8453")))
    ) ||
    accepts[0];

  if (!primary) {
    if (wantMainnet) {
      return {
        scheme: "exact",
        network: NETWORK_BASE_MAINNET,
        maxAmountRequired: "1000000",
        amount: "1000000",
        resource: "/api/brief",
        description: "World Domination Day Brief",
        mimeType: "application/json",
        payTo: RECEIVE_EVM,
        maxTimeoutSeconds: 60,
        asset: USDC_BASE_MAINNET,
        extra: { name: "USDC", version: "2", networkV2: NETWORK_BASE_MAINNET_CAIP2 },
      };
    }
    return {
      scheme: "exact",
      network: "base-sepolia",
      maxAmountRequired: "1000000",
      amount: "1000000",
      resource: "/api/brief",
      description: "World Domination Day Brief",
      mimeType: "application/json",
      payTo: RECEIVE_EVM,
      maxTimeoutSeconds: 60,
      asset: USDC_BASE_SEPOLIA,
      extra: { name: "USDC", version: "2", networkV2: NETWORK_BASE_SEPOLIA_CAIP2 },
    };
  }
  // Facilitator v2 often wants `amount`; our 402 body uses maxAmountRequired.
  const amount = primary.maxAmountRequired || primary.amount || "1000000";
  // When payment is mainnet but primary accept is still Sepolia-shaped (legacy
  // PAYMENT_REQUIRED default), force mainnet asset/network from constants.
  if (wantMainnet && !isMainnetNetwork(primary.network)) {
    return {
      scheme: primary.scheme || "exact",
      network: NETWORK_BASE_MAINNET,
      maxAmountRequired: amount,
      amount,
      resource: primary.resource || "/api/brief",
      description: primary.description || "World Domination Day Brief",
      mimeType: primary.mimeType || "application/json",
      payTo: RECEIVE_EVM,
      maxTimeoutSeconds: primary.maxTimeoutSeconds || 60,
      asset: USDC_BASE_MAINNET,
      extra: Object.assign({}, primary.extra || {}, {
        name: "USDC",
        version: "2",
        networkV2: NETWORK_BASE_MAINNET_CAIP2,
      }),
    };
  }
  return Object.assign({}, primary, { amount, maxAmountRequired: amount });
}

/** @deprecated use primaryRequirementsFor — kept name for any external callers */
function primaryBaseSepoliaRequirements() {
  return primaryRequirementsFor("base-sepolia");
}

function networkAllowed(network) {
  if (!network) return false;
  return (
    ALLOWED_NETWORKS.has(String(network).toLowerCase()) ||
    ALLOWED_NETWORKS.has(String(network))
  );
}

async function facilitatorPost(path, body) {
  const url = FACILITATOR_BASE.replace(/\/$/, "") + path;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch (_) {
    json = { raw: text };
  }
  return { http: res.status, json };
}

/**
 * Attempt verify→settle when kill-switch is on.
 * Returns a result object; never throws to callers (errors boxed).
 * When kill-switch off: { settled:false, kill_switch:false, facilitator_called:false }.
 */
async function tryVerifySettle(req) {
  const sigRaw =
    headerGet(req, "payment-signature") ||
    headerGet(req, "PAYMENT-SIGNATURE");
  const sigPresent = Boolean(sigRaw);
  const killOn = SETTLE_ON();

  if (!killOn) {
    return {
      ok: false,
      settled: false,
      kill_switch: false,
      x402_settle_env: process.env.X402_SETTLE || "0",
      payment_signature_header_seen: sigPresent,
      facilitator_called: false,
      status: "not_settled",
      message:
        "settle kill-switch OFF (X402_SETTLE!=1). Honest stub — no PayAI POST /verify or /settle.",
      rail: "base-sepolia-and-base-mainnet-when-enabled",
    };
  }

  if (!sigPresent) {
    return {
      ok: false,
      settled: false,
      kill_switch: true,
      payment_signature_header_seen: false,
      facilitator_called: false,
      status: "missing_payment_signature",
      message: "X402_SETTLE=1 but PAYMENT-SIGNATURE header missing.",
    };
  }

  const paymentPayload = decodePaymentSignature(sigRaw);
  if (!paymentPayload) {
    return {
      ok: false,
      settled: false,
      kill_switch: true,
      payment_signature_header_seen: true,
      facilitator_called: false,
      status: "invalid_payment_signature",
      message: "PAYMENT-SIGNATURE could not be decoded as base64 JSON or JSON.",
    };
  }

  const accepted = paymentPayload.accepted || {};
  const net = accepted.network || paymentPayload.network;
  if (!networkAllowed(net)) {
    return {
      ok: false,
      settled: false,
      kill_switch: true,
      payment_signature_header_seen: true,
      facilitator_called: false,
      status: "network_not_allowed",
      message:
        "Live settle proxy allows Base Sepolia (base-sepolia / eip155:84532) and Base mainnet (base / eip155:8453). Got: " +
        String(net),
      network: net,
    };
  }

  const paymentRequirements = primaryRequirementsFor(net);
  // Day 35: requirements are server-authoritative. Never adopt client-supplied
  // payTo / asset / amount; reject any payload whose terms differ from the challenge.
  const same = (x, y) => String(x || "").toLowerCase() === String(y || "").toLowerCase();
  const clientAmount = accepted.amount || accepted.maxAmountRequired;
  if (
    (accepted.payTo && !same(accepted.payTo, paymentRequirements.payTo)) ||
    (accepted.asset && !same(accepted.asset, paymentRequirements.asset)) ||
    (clientAmount && String(clientAmount) !== String(paymentRequirements.amount))
  ) {
    return {
      ok: false,
      settled: false,
      kill_switch: true,
      payment_signature_header_seen: true,
      facilitator_called: false,
      status: "requirements_mismatch",
      message: "Payload terms (payTo/asset/amount) do not match this challenge.",
    };
  }

  const body = { paymentPayload, paymentRequirements };

  try {
    const verify = await facilitatorPost("/verify", body);
    const valid =
      verify.json &&
      (verify.json.isValid === true || verify.json.valid === true);
    if (!valid) {
      return {
        ok: false,
        settled: false,
        kill_switch: true,
        payment_signature_header_seen: true,
        facilitator_called: true,
        status: "verify_failed",
        verify_http: verify.http,
        verify: verify.json,
        message: "Facilitator /verify did not return isValid:true.",
      };
    }

    const settle = await facilitatorPost("/settle", body);
    const success =
      settle.json &&
      (settle.json.success === true || settle.json.settled === true);
    const railLabel = isMainnetNetwork(net) ? "Base mainnet" : "Base Sepolia";
    return {
      ok: Boolean(success),
      settled: Boolean(success),
      kill_switch: true,
      payment_signature_header_seen: true,
      facilitator_called: true,
      status: success ? "settled" : "settle_failed",
      verify_http: verify.http,
      settle_http: settle.http,
      verify: { isValid: true, payer: verify.json && verify.json.payer },
      settle: settle.json,
      message: success
        ? "Facilitator verify+settle succeeded on " + railLabel + "."
        : "Facilitator /settle did not return success:true.",
      payment_response: success
        ? {
            success: true,
            transaction: settle.json.transaction || "",
            network: settle.json.network || net,
            payer: settle.json.payer || (verify.json && verify.json.payer),
          }
        : undefined,
    };
  } catch (err) {
    return {
      ok: false,
      settled: false,
      kill_switch: true,
      payment_signature_header_seen: true,
      facilitator_called: true,
      status: "facilitator_error",
      message: "Facilitator request error: " + (err && err.message ? err.message : String(err)),
    };
  }
}

function stubBody(req) {
  const sigRaw =
    headerGet(req, "payment-signature") ||
    headerGet(req, "PAYMENT-SIGNATURE");
  return {
    ok: false,
    settled: false,
    mode: process.env.X402_MODE || "stub",
    status: "not_settled",
    kill_switch: false,
    x402_settle_env: process.env.X402_SETTLE || "0",
    payment_signature_header_seen: Boolean(sigRaw),
    facilitator_called: false,
    message:
      "not settled — wire facilitator behind X402_SETTLE=1 (POST " +
      FACILITATOR_BASE +
      "/verify then /settle). Default does not call PayAI.",
    accepts_network_v1: NETWORK_BASE_SEPOLIA,
    accepts_network_v2: NETWORK_V2,
    accepts_networks_settle: [
      "base-sepolia",
      NETWORK_BASE_SEPOLIA_CAIP2,
      "base",
      NETWORK_BASE_MAINNET_CAIP2,
    ],
    payTo: RECEIVE_EVM,
    asset: USDC_BASE_SEPOLIA,
  };
}

module.exports = {
  SETTLE_ON,
  tryVerifySettle,
  stubBody,
  headerGet,
  decodePaymentSignature,
  networkAllowed,
  primaryRequirementsFor,
  primaryBaseSepoliaRequirements,
  isMainnetNetwork,
};
