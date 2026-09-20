#!/usr/bin/env node
/**
 * Offline / no-spend validation of Day Pass mint scaffold.
 * Does NOT touch chain, faucet, or Galaxy Mind money.
 * Validates metadata JSON, scripts presence, keypair pubkey (not secret),
 * and optionally fetches public metadata URIs.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import os from 'node:os'
import {
  DAYPASS_METADATA_URI,
  COLLECTION_METADATA_URI,
  SUPPLY,
  KEYPAIR_PATH,
  ADDRESSES_PATH,
  DEVNET_RPC,
  CLUSTER,
} from './lib-umi.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MINT_ROOT = path.resolve(__dirname, '..')
const errors = []
const warnings = []
const ok = []

function check(cond, msg, warn = false) {
  if (cond) ok.push(msg)
  else if (warn) warnings.push(msg)
  else errors.push(msg)
}

console.log('=== Day Pass mint dry-run verify ===')
console.log('cluster intent:', CLUSTER)
console.log('rpc default:', DEVNET_RPC)
console.log('supply:', SUPPLY)
console.log('keypair path:', KEYPAIR_PATH)
console.log('addresses path:', ADDRESSES_PATH)

// package + scripts
const pkg = JSON.parse(fs.readFileSync(path.join(MINT_ROOT, 'package.json'), 'utf8'))
check(pkg.engines?.node?.includes('20') || pkg.engines?.node?.includes('>=20'), 'package.json engines Node >=20')
for (const s of ['gen-keypair-devnet', 'airdrop-devnet', 'create-cm-devnet', 'mint-one-devnet', 'verify-dry-run']) {
  const exists = Boolean(pkg.scripts?.[s]) || s === 'verify-dry-run'
  // verify-dry-run may be added in same PR; check file either way
  const file = path.join(MINT_ROOT, 'scripts', s === 'verify-dry-run' ? 'verify-dry-run.mjs' : `${s}.mjs`)
  check(fs.existsSync(file), `script present: scripts/${path.basename(file)}`)
}
for (const dep of [
  '@metaplex-foundation/umi',
  '@metaplex-foundation/mpl-core',
  '@metaplex-foundation/mpl-core-candy-machine',
]) {
  check(
    Boolean(pkg.dependencies?.[dep]) && fs.existsSync(path.join(MINT_ROOT, 'node_modules', dep)),
    `dep installed: ${dep}`,
  )
}

// metadata files
const daypassMetaPath = path.join(MINT_ROOT, 'daypass-metadata.json')
const collMetaPath = path.join(MINT_ROOT, 'collection-metadata.json')
const daypass = JSON.parse(fs.readFileSync(daypassMetaPath, 'utf8'))
const coll = JSON.parse(fs.readFileSync(collMetaPath, 'utf8'))
check(daypass.name === 'World Domination Day Pass', 'daypass-metadata name')
check(daypass.symbol === 'WDDAY', 'daypass-metadata symbol')
check(
  String(daypass.description || '').includes('Not an investment') ||
    String(daypass.description || '').toLowerCase().includes('utility'),
  'daypass-metadata utility (not equity) copy present',
)
check(
  (daypass.attributes || []).some((a) => a.trait_type === 'operator' && a.value === 'Galaxy Mind'),
  'daypass-metadata operator Galaxy Mind',
)
check(coll.name === 'World Domination Day Pass', 'collection-metadata name')
check(coll.symbol === 'WDDAY', 'collection-metadata symbol')
check(!String(JSON.stringify(daypass)).toLowerCase().includes(' legal '), 'no forbidden "legal" word in daypass metadata')

// keypair: pubkey only
check(fs.existsSync(KEYPAIR_PATH), `disposable keypair file exists at ${KEYPAIR_PATH}`)
let pubkey = null
if (fs.existsSync(KEYPAIR_PATH)) {
  const secret = JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf8'))
  check(Array.isArray(secret) && secret.length >= 64, 'keypair JSON shape valid (array len>=64)')
  const pubPath = path.join(os.homedir(), '.config', 'world-domination-wallet', 'daypass-devnet.pubkey')
  if (fs.existsSync(pubPath)) {
    pubkey = fs.readFileSync(pubPath, 'utf8').trim()
    check(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(pubkey), `pubkey file readable: ${pubkey}`)
  } else {
    warnings.push('daypass-devnet.pubkey missing (keypair exists)')
  }
}

const addrs = fs.existsSync(ADDRESSES_PATH)
  ? JSON.parse(fs.readFileSync(ADDRESSES_PATH, 'utf8'))
  : null
if (addrs?.candyMachine) {
  ok.push(`on-chain addresses present: CM=${addrs.candyMachine}`)
} else {
  warnings.push('out/devnet-addresses.json absent — create-cm-devnet not run yet (expected if faucet dry)')
}

// fetch public metadata URIs (read-only)
async function fetchUri(label, uri) {
  try {
    const res = await fetch(uri, { method: 'GET' })
    check(res.ok, `${label} URI HTTP ${res.status}: ${uri}`)
    if (res.ok) {
      const j = await res.json()
      check(typeof j.name === 'string' && j.name.length > 0, `${label} remote JSON has name`)
    }
  } catch (e) {
    warnings.push(`${label} URI fetch failed: ${e.message}`)
  }
}

await fetchUri('daypass', DAYPASS_METADATA_URI)
await fetchUri('collection', COLLECTION_METADATA_URI)

// balance probe (read-only)
if (pubkey) {
  try {
    const res = await fetch(DEVNET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [pubkey],
      }),
    })
    const body = await res.json()
    const lamports = body?.result?.value ?? null
    if (lamports === 0) {
      warnings.push(`devnet balance 0 for ${pubkey} — airdrop/create blocked`)
    } else if (typeof lamports === 'number') {
      ok.push(`devnet balance ${lamports} lamports`)
    } else {
      warnings.push(`devnet getBalance unexpected: ${JSON.stringify(body).slice(0, 200)}`)
    }
  } catch (e) {
    warnings.push(`devnet getBalance failed: ${e.message}`)
  }
}

console.log('\nOK:')
for (const m of ok) console.log('  +', m)
if (warnings.length) {
  console.log('\nWARNINGS:')
  for (const m of warnings) console.log('  !', m)
}
if (errors.length) {
  console.log('\nERRORS:')
  for (const m of errors) console.log('  x', m)
  process.exitCode = 1
} else {
  console.log('\nDry-run PASS (scaffold valid; on-chain create still needs faucet SOL).')
}
