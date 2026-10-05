# Live x402 demo (no secrets)

**Live product URL:** https://world-domination-x402.vercel.app/

Public Vercel deploy of the GET /brief twin scaffold (stdlib-equivalent Node serverless).

| Endpoint | Behavior |
| --- | --- |
| `GET /api/paid-brief` | **Canonical paid resource (x402 v2).** HTTP **402** + `PAYMENT-REQUIRED` (v2, Base Sepolia `eip155:84532`, 1.00 USDC); `resource.url` is this exact URL |
| `GET /api/health` | ok + honesty flags |
| `GET /api/brief` | free stub Day Brief JSON |
| `GET /api/brief?mode=402` | legacy x402 **v1** challenge (deprecated; `Link: rel=canonical` → `/api/paid-brief`) |
| `GET /api/verify` | honest **not settled** |

```bash
curl -si https://world-domination-x402.vercel.app/api/paid-brief | head -20
curl -s https://world-domination-x402.vercel.app/api/brief | python3 -m json.tool
curl -si https://world-domination-x402.vercel.app/api/brief?mode=402 | head -40
curl -s https://world-domination-x402.vercel.app/api/verify | python3 -m json.tool
```

Capital = 0; mint/settle **not live**. Mirrors war-room `x402/brief_server.py`.

Contract notes for the v2 resource: `../x402/v2_canonical.md`. Local smoke (mocked facilitator): `node test/smoke_v2.mjs`.
