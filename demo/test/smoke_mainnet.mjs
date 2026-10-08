import { execFileSync } from "child_process";
// Run from demo/: node test/smoke_mainnet.mjs  (no network). Checks both modes in child processes.
const probe = `
const r=(m)=>new Promise(async(res)=>{const h={};const o={statusCode:200,setHeader:(k,v)=>(h[k.toLowerCase()]=v),end:(b)=>res({s:o.statusCode,h,b:b?JSON.parse(b):null})};await m({method:"GET",headers:{},query:{}},o);});
(async()=>{const p=process.cwd()+"/api/";
const pb=await r(require(p+"paid-brief.js"));const pr=JSON.parse(Buffer.from(pb.h["payment-required"],"base64").toString());
const oa=await r(require(p+"openapi.js"));const hl=await r(require(p+"health.js"));
const v2=require(p+"_v2.js");
const good={x402Version:2,resource:v2.RESOURCE,accepted:v2.REQUIREMENTS,payload:{authorization:{to:v2.REQUIREMENTS.payTo,value:v2.REQUIREMENTS.amount,nonce:"0x1"}}};
const wrongNet=JSON.parse(JSON.stringify(good));wrongNet.accepted.network=v2.TESTNET?"eip155:8453":"eip155:84532";
console.log(JSON.stringify({status:pb.s,network:pr.accepts[0].network,asset:pr.accepts[0].asset,payTo:pr.accepts[0].payTo,
 oaTestnet:oa.b.paths["/api/paid-brief"].get["x-payment-info"].protocols[0].x402.testnet,settle_live:hl.b.settle_live,
 goodMismatch:v2.mismatch(good),wrongNet:v2.mismatch(wrongNet)}));})();`;
const run = (env) => JSON.parse(execFileSync("node", ["-e", probe], { env: { ...process.env, X402_SETTLE: "", ...env } }).toString());
const assert = (c, m) => { if (!c) { console.error("FAIL:", m); process.exit(1); } };
const def = run({ X402_V2_NETWORK: "" });
assert(def.network === "eip155:84532" && def.asset === "0x036CbD53842c5426634e7929541eC2318f3dCF7e" && def.oaTestnet === true, "default stays Base Sepolia");
const main = run({ X402_V2_NETWORK: "base" });
assert(main.network === "eip155:8453" && main.asset === "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" && main.oaTestnet === false, "mainnet switch");
for (const m of [def, main]) {
  assert(m.status === 402 && m.settle_live === false, "402 + settle off");
  assert(m.payTo === "0xD8436B7afD09E10704931E17FBC79dE71BF944C9", "payTo");
  assert(m.goodMismatch === null && m.wrongNet === "network_mismatch", "cross-network payload rejected");
}
console.log("smoke_mainnet: PASS", JSON.stringify({ default: def.network, mainnet: main.network }));
