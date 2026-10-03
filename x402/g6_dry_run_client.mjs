#!/usr/bin/env node
/**
 * G6 dry-run settle client harness (Day 33)
 *
 * Default: DRY-RUN ONLY.
 *   - GET live /api/health
 *   - GET live /api/brief?mode=402 (expects HTTP 402)
 *   - Print accepts[0] fields needed to build a payment payload
 *   - Does NOT sign, does NOT POST facilitator /verify or /settle
 *   - Never embeds secrets; never sets production X402_SETTLE
 *
 * Live sign/post path is intentionally gated:
 *   G6_LIVE=1 AND a private key present in env (G6_PRIVATE_KEY)
 *   Even then this script only documents the gate and exits unless
 *   both are set — and still refuses to enable production settle.
 *
 * Usage:
 *   node x402/g6_dry_run_client.mjs
 *   node x402/g6_dry_run_client.mjs --base https://world-domination-x402.vercel.app
 */

const DEFAULT_BASE = "https://world-domination-x402.vercel.app";

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return null;
}

const base = (argValue("--base") || process.env.G6_BASE || DEFAULT_BASE).replace(/\/$/, "");
const live = process.env.G6_LIVE === "1";
const hasKey = Boolean(process.env.G6_PRIVATE_KEY && String(process.env.G6_PRIVATE_KEY).trim());

async function getJson(url, { allowStatus } = {}) {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { _raw: text.slice(0, 500) };
  }
  if (allowStatus && allowStatus.includes(res.status)) {
    return { status: res.status, headers: res.headers, body };
  }
  if (!res.ok && !(allowStatus && allowStatus.includes(res.status))) {
    throw new Error(`GET ${url} → HTTP ${res.status}`);
  }
  return { status: res.status, headers: res.headers, body };
}

function pickAccept0(body) {
  const a0 = body?.accepts?.[0];
  if (!a0) return null;
  return {
    scheme: a0.scheme,
    network: a0.network,
    maxAmountRequired: a0.maxAmountRequired,
    resource: a0.resource,
    description: a0.description,
    mimeType: a0.mimeType,
    payTo: a0.payTo,
    maxTimeoutSeconds: a0.maxTimeoutSeconds,
    asset: a0.asset,
    extra: a0.extra || {},
  };
}

async function main() {
  console.log("=== G6 dry-run client (Day 33) ===");
  console.log(`base: ${base}`);
  console.log(`G6_LIVE: ${live ? "1" : "0 (dry-run)"}`);
  console.log(`G6_PRIVATE_KEY present: ${hasKey ? "yes" : "no"}`);
  console.log("production X402_SETTLE: not touched by this script\n");

  const healthUrl = `${base}/api/health`;
  const briefUrl = `${base}/api/brief?mode=402`;

  const health = await getJson(healthUrl);
  console.log("--- GET /api/health ---");
  console.log(
    JSON.stringify(
      {
        http: health.status,
        primary_network: health.body.primary_network,
        payTo: health.body.payTo,
        settle_live: health.body.settle_live,
        settle_kill_switch: health.body.settle_kill_switch,
        x402_settle_env: health.body.x402_settle_env,
        capital: health.body.capital,
      },
      null,
      2
    )
  );

  const brief = await getJson(briefUrl, { allowStatus: [402, 200] });
  console.log("\n--- GET /api/brief?mode=402 ---");
  console.log(`http: ${brief.status}`);
  const a0 = pickAccept0(brief.body);
  if (!a0) {
    console.log("accepts[0]: missing — unexpected body:");
    console.log(JSON.stringify(brief.body, null, 2).slice(0, 800));
  } else {
    console.log("accepts[0] fields for payment payload:");
    console.log(JSON.stringify(a0, null, 2));
    console.log("\nSecondary accepts count:", (brief.body.accepts || []).length);
  }

  const fac = brief.body?.facilitator_path || {};
  console.log("\nfacilitator_path:", JSON.stringify(fac, null, 2));

  console.log("\n--- Gate check ---");
  if (!live || !hasKey) {
    console.log(
      "DRY-RUN complete. No signature built. No POST to facilitator /verify or /settle."
    );
    console.log(
      "To attempt a live client later: set G6_LIVE=1 and G6_PRIVATE_KEY in env (never commit),"
    );
    console.log(
      "fund Base Sepolia ETH+USDC via faucets in g6_test_client.md, and keep production X402_SETTLE unset until an explicit Day step."
    );
    console.log(
      "Testnet balances ≠ Capital toward $100. Ask Galaxy Mind before any operating spend."
    );
    process.exit(0);
  }

  // Live gate reached: still do not auto-sign in this Day-33 harness.
  // Document the intended next implementation slice without embedding crypto deps or secrets.
  console.log("G6_LIVE=1 and key present — Day-33 harness still refuses auto-sign.");
  console.log(
    "Next Day slice (after faucet funds): implement EIP-3009 / x402 exact payload signing"
  );
  console.log(
    "against accepts[0], then retry brief with PAYMENT-SIGNATURE. Server settle remains off"
  );
  console.log("until X402_SETTLE=1 is set in a gated env. Exiting without network side effects.");
  process.exit(0);
}

main().catch((err) => {
  console.error("g6_dry_run_client failed:", err.message || err);
  process.exit(1);
});
