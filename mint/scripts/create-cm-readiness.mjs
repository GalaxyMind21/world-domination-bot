#!/usr/bin/env node
/**
 * Reusable Core Candy Machine create readiness check.
 * Documents exact blocker + free alternative path. No spend. No mainnet.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  KEYPAIR_PATH,
  ADDRESSES_PATH,
  DEVNET_RPC,
  CLUSTER,
  SUPPLY,
  DAYPASS_METADATA_URI,
  COLLECTION_METADATA_URI,
} from './lib-umi.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MINT_ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(MINT_ROOT, 'out')
const PUBKEY =
  process.env.DAYPASS_DEVNET_PUBKEY ||
  'AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9'

const blockers = []
const ready = []
const evidence = {}

function note(ok, msg) {
  if (ok) ready.push(msg)
  else blockers.push(msg)
}

async function rpc(method, params) {
  const res = await fetch(DEVNET_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  return res.json()
}

console.log('=== Core CM create-readiness ===')
console.log('cluster:', CLUSTER)
console.log('rpc:', DEVNET_RPC)
console.log('authority pubkey:', PUBKEY)
console.log('supply:', SUPPLY)

note(fs.existsSync(KEYPAIR_PATH), `keypair present at ${KEYPAIR_PATH}`)
note(
  fs.existsSync(path.join(MINT_ROOT, 'scripts', 'create-cm-devnet.mjs')),
  'create-cm-devnet.mjs present',
)
note(
  fs.existsSync(path.join(MINT_ROOT, 'scripts', 'mint-one-devnet.mjs')),
  'mint-one-devnet.mjs present',
)
note(
  fs.existsSync(path.join(MINT_ROOT, 'node_modules', '@metaplex-foundation', 'mpl-core-candy-machine')),
  'mpl-core-candy-machine installed',
)

const addrs = fs.existsSync(ADDRESSES_PATH)
  ? JSON.parse(fs.readFileSync(ADDRESSES_PATH, 'utf8'))
  : null
evidence.addresses = addrs
if (addrs?.candyMachine) {
  ready.push(`already on-chain: candyMachine=${addrs.candyMachine}`)
} else {
  blockers.push('out/devnet-addresses.json absent — create-cm not completed')
}

let lamports = null
let airdropError = null
try {
  const bal = await rpc('getBalance', [PUBKEY])
  lamports = bal?.result?.value ?? null
  evidence.balance_lamports = lamports
  if (lamports === 0) {
    blockers.push(`devnet balance 0 for ${PUBKEY} — faucet dry / unfunded`)
  } else if (typeof lamports === 'number' && lamports > 0) {
    ready.push(`devnet balance ${lamports} lamports`)
  } else {
    blockers.push(`unexpected getBalance: ${JSON.stringify(bal).slice(0, 180)}`)
  }
} catch (e) {
  blockers.push(`getBalance failed: ${e.message}`)
}

// Probe airdrop without claiming large amounts repeatedly if already dry
try {
  const air = await rpc('requestAirdrop', [PUBKEY, 100_000_000]) // 0.1 SOL probe
  evidence.airdrop_probe = air
  if (air?.error) {
    airdropError = air.error.message || JSON.stringify(air.error)
    blockers.push(`airdrop probe failed: ${airdropError}`)
  } else if (air?.result) {
    ready.push(`airdrop probe signature ${air.result}`)
  }
} catch (e) {
  airdropError = e.message
  blockers.push(`airdrop probe exception: ${e.message}`)
}

evidence.metadata_uris = {
  daypass: DAYPASS_METADATA_URI,
  collection: COLLECTION_METADATA_URI,
}

const funded = typeof lamports === 'number' && lamports > 0
const canCreate = funded && !addrs?.candyMachine && fs.existsSync(KEYPAIR_PATH)
const status = addrs?.candyMachine
  ? 'READY_ALREADY_CREATED'
  : canCreate
    ? 'READY_TO_CREATE'
    : 'BLOCKED_FAUCET'

const report = {
  as_of: new Date().toISOString(),
  status,
  primary_rail: 'metaplex-core-candy-machine-umi',
  authority_pubkey: PUBKEY,
  balance_lamports: lamports,
  airdrop_error: airdropError,
  ready,
  blockers,
  unblock: {
    human_faucet: `https://faucet.solana.com/ → ${PUBKEY}`,
    then: 'cd mint && npm run create-cm-devnet && npm run mint-one-devnet',
  },
  free_alternative: {
    name: 'Underdog Protocol REST (devnet)',
    why: 'Bearer mint without faucet SOL when dashboard free API key exists',
    commands: [
      'npm run underdog-dry-run',
      'npm run underdog-probe',
      '# after free key: npm run underdog-create-project -- --confirm',
      '# UNDERDOG_PROJECT_ID=<id> npm run underdog-mint-one -- --confirm',
    ],
    cost: 'devnet free; mainnet paid = NO-GO until Capital > 0',
    key_path: path.join(
      process.env.HOME || '~',
      '.config/world-domination-wallet/underdog-devnet-api-key.txt',
    ),
  },
  evidence,
}

fs.mkdirSync(OUT_DIR, { recursive: true })
const outPath = path.join(OUT_DIR, 'create-cm-readiness.json')
fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n')

console.log('\nstatus:', status)
console.log('READY:')
for (const m of ready) console.log('  +', m)
console.log('BLOCKERS:')
for (const m of blockers) console.log('  !', m)
console.log('wrote:', outPath)
if (status === 'BLOCKED_FAUCET') {
  console.log(
    '\nCore CM still primary. Free fallback: npm run underdog-dry-run (no spend).',
  )
  process.exitCode = 2
} else if (status === 'READY_TO_CREATE') {
  console.log('\nFunded — run: npm run create-cm-devnet && npm run mint-one-devnet')
}
