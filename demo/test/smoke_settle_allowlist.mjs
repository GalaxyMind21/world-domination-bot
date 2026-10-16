import { createRequire } from "module";
const require = createRequire(import.meta.url);
// Run from demo/: node test/smoke_settle_allowlist.mjs  (no network; never calls PayAI)
delete process.env.X402_SETTLE;
const settle = require(process.cwd() + "/api/_settle.js");
const assert = (c, m) => { if (!c) { console.error("FAIL:", m); process.exit(1); } };

assert(settle.SETTLE_ON() === false, "kill-switch default off");
for (const n of ["base-sepolia", "eip155:84532", "base", "eip155:8453"]) {
  assert(settle.networkAllowed(n) === true, "allow " + n);
}
assert(settle.networkAllowed("eip155:1") === false, "reject ethereum mainnet");
assert(settle.networkAllowed("") === false, "reject empty");

const sepolia = settle.primaryRequirementsFor("eip155:84532");
assert(sepolia.asset === "0x036CbD53842c5426634e7929541eC2318f3dCF7e", "sepolia USDC");
assert(
  sepolia.network === "base-sepolia" || sepolia.network === "eip155:84532",
  "sepolia network shape"
);

const main = settle.primaryRequirementsFor("eip155:8453");
assert(main.asset === "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "mainnet USDC");
assert(main.network === "base" || main.network === "eip155:8453", "mainnet network shape");
assert(main.payTo === "0xD8436B7afD09E10704931E17FBC79dE71BF944C9", "payTo");

// Kill-switch off: mainnet signature must not call facilitator
const mainSig = Buffer.from(
  JSON.stringify({
    x402Version: 1,
    accepted: {
      scheme: "exact",
      network: "eip155:8453",
      payTo: "0xD8436B7afD09E10704931E17FBC79dE71BF944C9",
      asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      amount: "1000000",
    },
  })
).toString("base64");
const off = await settle.tryVerifySettle({
  headers: { "payment-signature": mainSig },
});
assert(off.kill_switch === false && off.facilitator_called === false && off.settled === false, "off path");

// Kill-switch on + disallowed network → network_not_allowed, no facilitator
process.env.X402_SETTLE = "1";
let fetchCalls = 0;
globalThis.fetch = async () => {
  fetchCalls++;
  return { status: 200, text: async () => "{}" };
};
const bad = await settle.tryVerifySettle({
  headers: {
    "payment-signature": Buffer.from(
      JSON.stringify({ accepted: { network: "eip155:1", payTo: "0xD8436B7afD09E10704931E17FBC79dE71BF944C9", asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", amount: "1000000" } })
    ).toString("base64"),
  },
});
assert(bad.status === "network_not_allowed" && fetchCalls === 0, "reject unknown network");

// Kill-switch on + mainnet allowlisted → past network gate (facilitator mocked fail ok)
fetchCalls = 0;
globalThis.fetch = async () => {
  fetchCalls++;
  return { status: 200, text: async () => JSON.stringify({ isValid: false }) };
};
const gated = await settle.tryVerifySettle({
  headers: { "payment-signature": mainSig },
});
assert(gated.status === "verify_failed" && fetchCalls >= 1, "mainnet reaches facilitator when on");
assert(gated.settled === false, "not settled on verify fail");

delete process.env.X402_SETTLE;
console.log(
  "smoke_settle_allowlist: PASS",
  JSON.stringify({
    allowed: ["base-sepolia", "eip155:84532", "base", "eip155:8453"],
    kill_default: false,
    mainnet_asset: main.asset,
  })
);
