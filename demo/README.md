# Live x402 demo (no secrets)

**Live product URL:** https://world-domination-x402.vercel.app/

Public Vercel deploy of the GET /brief twin scaffold (stdlib-equivalent Node serverless).

| Endpoint | Behavior |
| --- | --- |
| `GET /api/health` | ok + honesty flags |
| `GET /api/brief` | free stub Day Brief JSON |
| `GET /api/brief?mode=402` | HTTP **402** + `PAYMENT-REQUIRED` |
| `GET /api/verify` | honest **not settled** |

```bash
curl -s https://world-domination-x402.vercel.app/api/brief | python3 -m json.tool
curl -si https://world-domination-x402.vercel.app/api/brief?mode=402 | head -40
curl -s https://world-domination-x402.vercel.app/api/verify | python3 -m json.tool
```

Capital = 0; mint/settle **not live**. Mirrors war-room `x402/brief_server.py`.
