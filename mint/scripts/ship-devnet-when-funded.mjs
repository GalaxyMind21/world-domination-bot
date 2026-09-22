#!/usr/bin/env node
/**
 * Day Pass Core CM one-command ship path (devnet only).
 *
 * Modes:
 *   --simulate   No chain / no SOL. Validates live metadata URIs + scaffold,
 *                writes a full simulated out/ package matching create+mint shape
 *                so the moment faucet funds, live mode is one command.
 *   (default)    If authority balance >= MIN_LAMPORTS: create-cm-devnet then
 *                mint-one-devnet. Else exit BLOCKED_FAUCET after writing plan.
 *
 * Never spends Galaxy Mind money. No mainnet. No private keys in out/.
 */
import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSigner } from '@metaplex-foundation/umi'
import { createUmi as createUmiDefaults } from '@metaplex-foundation/umi-bundle-defaults'
import {
  KEYPAIR_PATH,
  ADDRESSES_PATH,
  DEVNET_RPC,
  CLUSTER,
  SUPPLY,
  DAYPASS_METADATA_URI,
  COLLECTION_METADATA_URI,
  WALLET_DIR,
} from './lib-umi.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MINT_ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(MINT_ROOT, 'out')
const MIN_LAMPORTS = 50_000_000 // ~0.05 SOL
const PUBKEY_FILE = path.join(WALLET_DIR, 'daypass-devnet.pubkey')
const SIMULATE = process.argv.includes('--simulate')
const FORCE_LIVE = process.argv.includes('--live')

function readPubkey() {
  if (fs.existsSync(PUBKEY_FILE)) return fs.readFileSync(PUBKEY_FILE, 'utf8').trim()
  return process.env.DAYPASS_DEVNET_PUBKEY || 'AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9'
}

async function rpc(method, params) {
  const res = await fetch(DEVNET_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  return res.json()
}

async function fetchJson(label, uri) {
  const res = await fetch(uri, { method: 'GET' })
  if (!res.ok) throw new Error(`${label} URI HTTP ${res.status}: ${uri}`)
  const j = await res.json()
  if (!j?.name) throw new Error(`${label} remote JSON missing name`)
  // image optional for collection; daypass should have image
  return { uri, name: j.name, image: j.image || null, http: res.status }
}

function runNpm(script) {
  const r = spawnSync('npm', ['run', script], {
    cwd: MINT_ROOT,
    encoding: 'utf8',
    env: process.env,
  })
  if (r.stdout) process.stdout.write(r.stdout)
  if (r.stderr) process.stderr.write(r.stderr)
  if (r.status !== 0) {
    throw new Error(`npm run ${script} failed with exit ${r.status}`)
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  return filePath
}

async function buildSimulation(authority, balanceLamports, metaCheck) {
  // Offline signers only — mirrors create-cm + mint-one address shape.
  const umi = createUmiDefaults(DEVNET_RPC)
  const collection = generateSigner(umi)
  const candyMachine = generateSigner(umi)
  const asset = generateSigner(umi)

  const revealPayload = JSON.stringify([
    { name: 'World Domination Day Pass', uri: DAYPASS_METADATA_URI },
  ])
  const hashHex = crypto.createHash('sha256').update(revealPayload).digest('hex')

  const simulatedAddresses = {
    simulated: true,
    cluster: CLUSTER,
    createdAt: new Date().toISOString(),
    authority: String(authority),
    collection: String(collection.publicKey),
    candyMachine: String(candyMachine.publicKey),
    itemsAvailable: SUPPLY,
    storage: 'hiddenSettings',
    metadataUri: DAYPASS_METADATA_URI,
    collectionMetadataUri: COLLECTION_METADATA_URI,
    hiddenSettingsHashSha256: hashHex,
    createCollectionTx: 'SIMULATED_ONLY_NOT_ON_CHAIN',
    createCandyMachineTx: 'SIMULATED_ONLY_NOT_ON_CHAIN',
    notes:
      'SIMULATION only. Not on-chain. Do not treat pubkeys as live CM. Live: npm run ship-devnet-when-funded (after faucet).',
  }

  const simulatedMint = {
    simulated: true,
    cluster: CLUSTER,
    at: new Date().toISOString(),
    candyMachine: simulatedAddresses.candyMachine,
    collection: simulatedAddresses.collection,
    asset: String(asset.publicKey),
    tx: 'SIMULATED_ONLY_NOT_ON_CHAIN',
    metadataUri: DAYPASS_METADATA_URI,
    notes: 'SIMULATION of mintV1 one Day Pass. Live after create-cm succeeds.',
  }

  const plan = {
    as_of: new Date().toISOString(),
    mode: 'simulate',
    status: balanceLamports > 0 && balanceLamports >= MIN_LAMPORTS ? 'FUNDED_READY' : 'BLOCKED_FAUCET',
    primary_rail: 'metaplex-core-candy-machine-umi',
    cluster: CLUSTER,
    authority,
    balance_lamports: balanceLamports,
    min_lamports_required: MIN_LAMPORTS,
    metadata_uris_ok: metaCheck,
    one_command_when_funded: 'npm run ship-devnet-when-funded',
    equivalent_steps: [
      'npm run airdrop-devnet   # or human faucet.solana.com',
      'npm run create-cm-devnet',
      'npm run mint-one-devnet',
    ],
    simulated_artifacts: {
      addresses: 'out/devnet-addresses.simulated.json',
      mint: 'out/mint-one.simulated.json',
      plan: 'out/ship-devnet-plan.json',
    },
    live_addresses_path: 'out/devnet-addresses.json',
    blockers:
      balanceLamports >= MIN_LAMPORTS
        ? []
        : [
            `devnet balance ${balanceLamports} lamports for ${authority} — need >= ${MIN_LAMPORTS}`,
            'public RPC airdrop dry / rate-limited; use https://faucet.solana.com/',
          ],
    ci_hint:
      'In CI: npm run ship-devnet-simulate (always) then npm run ship-devnet-when-funded only when a funded secret keypair is injected (never commit keypairs).',
  }

  const paths = {
    addresses: writeJson(path.join(OUT_DIR, 'devnet-addresses.simulated.json'), simulatedAddresses),
    mint: writeJson(path.join(OUT_DIR, 'mint-one.simulated.json'), simulatedMint),
    plan: writeJson(path.join(OUT_DIR, 'ship-devnet-plan.json'), plan),
  }
  return { plan, simulatedAddresses, simulatedMint, paths }
}

async function main() {
  console.log('=== Day Pass ship-devnet-when-funded ===')
  console.log('cluster:', CLUSTER)
  console.log('rpc:', DEVNET_RPC)
  console.log('mode:', SIMULATE ? 'simulate' : FORCE_LIVE ? 'live-forced' : 'live-or-block')

  const authority = readPubkey()
  console.log('authority:', authority)
  console.log('keypair path:', KEYPAIR_PATH)
  console.log('metadata daypass:', DAYPASS_METADATA_URI)
  console.log('metadata collection:', COLLECTION_METADATA_URI)

  if (!fs.existsSync(KEYPAIR_PATH)) {
    console.error('Missing keypair. Run: npm run gen-keypair-devnet')
    process.exit(1)
  }

  // Always validate live metadata URIs (no spend).
  const metaCheck = {
    daypass: await fetchJson('daypass', DAYPASS_METADATA_URI),
    collection: await fetchJson('collection', COLLECTION_METADATA_URI),
  }
  console.log('metadata URIs: OK')

  let balanceLamports = 0
  try {
    const bal = await rpc('getBalance', [authority])
    balanceLamports = bal?.result?.value ?? 0
  } catch (e) {
    console.warn('getBalance failed:', e.message)
  }
  console.log('balance lamports:', balanceLamports)

  if (SIMULATE || (!FORCE_LIVE && balanceLamports < MIN_LAMPORTS)) {
    const sim = await buildSimulation(authority, balanceLamports, metaCheck)
    console.log('\nWrote simulation package:')
    for (const [k, p] of Object.entries(sim.paths)) console.log(`  ${k}: ${p}`)
    console.log('\nstatus:', sim.plan.status)
    if (sim.plan.status === 'BLOCKED_FAUCET') {
      console.log('BLOCKED_FAUCET — fund authority then: npm run ship-devnet-when-funded')
      console.log('Human faucet:', `https://faucet.solana.com/ → ${authority}`)
      // simulate mode exits 0 (CI-green); live-or-block exits 2 when dry
      process.exit(SIMULATE ? 0 : 2)
    }
    // funded but --simulate only
    console.log('Funded and simulated only. For live create+mint: npm run ship-devnet-when-funded')
    process.exit(0)
  }

  // Live path
  if (fs.existsSync(ADDRESSES_PATH) && !process.env.FORCE_NEW) {
    const existing = JSON.parse(fs.readFileSync(ADDRESSES_PATH, 'utf8'))
    if (existing?.candyMachine) {
      console.log('Existing out/devnet-addresses.json found — minting one…')
      runNpm('mint-one-devnet')
      const plan = {
        as_of: new Date().toISOString(),
        mode: 'live',
        status: 'MINTED',
        addresses_path: ADDRESSES_PATH,
      }
      writeJson(path.join(OUT_DIR, 'ship-devnet-plan.json'), plan)
      console.log('Done (mint-one).')
      process.exit(0)
    }
  }

  console.log('Creating Core CM then minting one…')
  runNpm('create-cm-devnet')
  runNpm('mint-one-devnet')
  const addrs = fs.existsSync(ADDRESSES_PATH)
    ? JSON.parse(fs.readFileSync(ADDRESSES_PATH, 'utf8'))
    : null
  writeJson(path.join(OUT_DIR, 'ship-devnet-plan.json'), {
    as_of: new Date().toISOString(),
    mode: 'live',
    status: 'CREATED_AND_MINTED',
    addresses: addrs,
  })
  console.log('Done. Live addresses in out/devnet-addresses.json')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
