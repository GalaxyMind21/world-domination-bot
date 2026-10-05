import { createRequire } from "module";
const require = createRequire(import.meta.url);
// Run from demo/:  node test/smoke_v2.mjs   (mocks fetch; never calls PayAI)
const path = process.cwd() + "/api/";
function call(mod, headers = {}, query = {}) {
  return new Promise(async (resolve) => {
    const h = {}; const res = { statusCode: 200, setHeader: (k, v) => (h[k.toLowerCase()] = v),
      end: (b) => resolve({ status: res.statusCode, headers: h, body: b ? JSON.parse(b) : null }) };
    await mod({ method: "GET", headers, query }, res);
  });
}
const dec = (s) => JSON.parse(Buffer.from(s, "base64").toString());
const out = {};
let paid = require(path + "paid-brief.js");
let r = await call(paid);
const pr = dec(r.headers["payment-required"]);
out.unpaid = { status: r.status, x402Version: pr.x402Version, resource: pr.resource.url, accepts0: pr.accepts[0], ext: Object.keys(pr.extensions) };
const v2 = require(path + "_v2.js");
const good = { x402Version: 2, resource: v2.RESOURCE, accepted: v2.REQUIREMENTS,
  payload: { signature: "0xdead", authorization: { from: "0x857b06519E91e3A54538791bDbb0E22373e36b66", to: v2.REQUIREMENTS.payTo, value: "1000000", validAfter: "0", validBefore: "9999999999", nonce: "0xabc" } } };
const sig = (o) => Buffer.from(JSON.stringify(o)).toString("base64");
r = await call(paid, { "payment-signature": sig(good) });
out.killOff = { status: r.status, attempt: r.body.settle_attempt };
// kill-switch on, mocked facilitator
process.env.X402_SETTLE = "1";
let calls = [];
globalThis.fetch = async (url, opt) => { calls.push([url, JSON.parse(opt.body).x402Version]);
  const body = url.endsWith("/verify") ? { isValid: true, payer: good.payload.authorization.from } : { success: true, transaction: "0xfeed", network: "eip155:84532", payer: good.payload.authorization.from };
  return { status: 200, text: async () => JSON.stringify(body) }; };
const evil = JSON.parse(JSON.stringify(good)); evil.accepted.payTo = "0x857b06519E91e3A54538791bDbb0E22373e36b66"; evil.payload.authorization.to = evil.accepted.payTo;
r = await call(paid, { "payment-signature": sig(evil) });
out.evilPayTo = { status: r.status, attempt: r.body.settle_attempt, facilitatorCalls: calls.length };
const v1p = JSON.parse(JSON.stringify(good)); v1p.x402Version = 1;
r = await call(paid, { "payment-signature": sig(v1p) });
out.v1payload = { status: r.status, reason: r.body.settle_attempt.reason };
r = await call(paid, { "payment-signature": sig(good) });
out.settled = { status: r.status, paymentResponse: dec(r.headers["payment-response"]), receipt: r.body.receipt, calls };
out.receiptStable = v2.receiptId("0xabc") === v2.receiptId("0xABC");
// legacy v1 with evil payTo via _settle
calls = [];
const brief = require(path + "brief.js");
const v1evil = { x402Version: 1, accepted: { scheme: "exact", network: "base-sepolia", payTo: "0x857b06519E91e3A54538791bDbb0E22373e36b66" } };
r = await call(brief, { "payment-signature": sig(v1evil) }, { mode: "402" });
out.legacyEvil = { status: r.status, attempt: r.body.settle_attempt, calls: calls.length, link: r.headers["link"], v1resource: r.body.accepts[0].resource, canonical: r.body.canonical_paid_resource };
delete process.env.X402_SETTLE;
const health = require(path + "health.js");
r = await call(health);
out.health = { canonical: r.body.canonical_paid_resource, x402: r.body.x402, settle_live: r.body.settle_live };
console.log(JSON.stringify(out, null, 2));
