import { createRequire } from "module";
const require = createRequire(import.meta.url);
// Run from demo/: node test/smoke_discovery.mjs  (no network)
const p = process.cwd() + "/api/";
function call(mod) { return new Promise(async (resolve) => { const h = {};
  const res = { statusCode: 200, setHeader: (k, v) => (h[k.toLowerCase()] = v), end: (b) => resolve({ status: res.statusCode, headers: h, body: b ? JSON.parse(b) : null }) };
  await mod({ method: "GET", headers: {}, query: {} }, res); }); }
const assert = (c, m) => { if (!c) { console.error("FAIL:", m); process.exit(1); } };
const v2 = require(p + "_v2.js");
let r = await call(require(p + "paid-brief.js"));
const pr = JSON.parse(Buffer.from(r.headers["payment-required"], "base64").toString());
assert(r.status === 402, "402");
const bz = pr.extensions.bazaar;
assert(bz && bz.info.input.type === "http" && bz.info.input.method === "GET", "bazaar input");
assert(bz.schema && bz.schema.required.includes("input"), "bazaar schema");
assert(pr.extensions["wd-receipt-binding"], "receipt-binding kept");
assert(/^\d+$/.test(pr.accepts[0].amount), "atomic amount");
r = await call(require(p + "openapi.js"));
const op = r.body.paths["/api/paid-brief"].get;
assert(r.body.openapi && r.body.info.title && r.body.info.version, "openapi top-level");
assert(op["x-payment-info"].protocols.includes("x402") && op["x-payment-info"].price.amount === "1.00", "x-payment-info");
assert(op.responses["402"], "402 response");
r = await call(require(p + "well-known-x402.js"));
assert(r.body.version === 1 && r.body.resources[0] === v2.CANONICAL_URL, "well-known");
r = await call(require(p + "health.js"));
assert(r.body.discovery && r.body.settle_live === false, "health discovery + settle off");
console.log("smoke_discovery: PASS", JSON.stringify({ bazaar: Object.keys(bz.info), price: op["x-payment-info"].price, wellKnown: r.body.discovery }));
