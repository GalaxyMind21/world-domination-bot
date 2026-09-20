#!/usr/bin/env node
/**
 * Underdog Protocol REST client scaffold (devnet-only).
 * Primary Day Pass rail remains Core Candy Machine + Umi.
 * This is the free agent-friendly fallback when public Solana faucet is dry.
 *
 * NO Galaxy Mind spend. Mainnet / paid Underdog plans are NO-GO until Capital > 0.
 * API key (if any) lives under ~/.config/world-domination-wallet/ — never commit.
 *
 * Modes:
 *   --dry-run (default)  Validate payload + docs endpoints; never mint without key.
 *   --probe              HEAD/GET public docs + base URL reachability (no auth).
 *   --create-project     POST /v2/projects (requires UNDERDOG_API_KEY, --confirm)
 *   --mint-one           POST /v2/projects/t/{id}/nfts (requires key + project id, --confirm)
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MINT_ROOT = path.resolve(__dirname, '..')
const WALLET_DIR = path.join(os.homedir(), '.config', 'world-domination-wallet')
const KEY_PATH =
  process.env.UNDERDOG_API_KEY_PATH ||
  path.join(WALLET_DIR, 'underdog-devnet-api-key.txt')
const OUT_DIR = path.join(MINT_ROOT, 'out')
const STATE_PATH = path.join(OUT_DIR, 'underdog-devnet-state.json')

/** OpenAPI servers list uses this; quickstart sometimes says dev.underdogprotocol.com */
const DEVNET_BASE =
  process.env.UNDERDOG_BASE_URL || 'https://devnet.underdogprotocol.com'
const ALT_BASE = 'https://dev.underdogprotocol.com'

const args = new Set(process.argv.slice(2))
const wantConfirm = args.has('--confirm')
const mode = args.has('--create-project')
  ? 'create-project'
  : args.has('--mint-one')
    ? 'mint-one'
    : args.has('--probe')
      ? 'probe'
      : 'dry-run'

function loadDayPassMeta() {
  return JSON.parse(
    fs.readFileSync(path.join(MINT_ROOT, 'daypass-metadata.json'), 'utf8'),
  )
}

function loadKey() {
  if (process.env.UNDERDOG_API_KEY) return process.env.UNDERDOG_API_KEY.trim()
  if (fs.existsSync(KEY_PATH)) {
    return fs.readFileSync(KEY_PATH, 'utf8').trim()
  }
  return null
}

function projectBody(meta) {
  return {
    name: meta.name.slice(0, 32),
    transferable: true,
    description: String(meta.description || '').slice(0, 500),
    image:
      meta.image ||
      'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/assets/daypass-placeholder.svg',
  }
}

function nftBody(meta, receiverAddress) {
  const attrs = {}
  for (const a of meta.attributes || []) {
    if (a?.trait_type) attrs[a.trait_type] = a.value
  }
  const body = {
    name: meta.name.slice(0, 32),
    symbol: (meta.symbol || 'WDDAY').slice(0, 10),
    description: String(meta.description || '').slice(0, 500),
    image:
      meta.image ||
      'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/assets/daypass-placeholder.svg',
    externalUrl:
      meta.external_url ||
      'https://github.com/GalaxyMind21/world-domination-bot',
    attributes: attrs,
  }
  if (receiverAddress) body.receiverAddress = receiverAddress
  return body
}

async function probeBase(base) {
  try {
    const res = await fetch(base, { method: 'GET', redirect: 'follow' })
    return { base, ok: res.ok || res.status < 500, status: res.status }
  } catch (e) {
    return { base, ok: false, status: null, error: e.message }
  }
}

async function dryRun() {
  const meta = loadDayPassMeta()
  const key = loadKey()
  const project = projectBody(meta)
  const nft = nftBody(meta, process.env.UNDERDOG_RECEIVER || null)
  const forbidden = JSON.stringify({ project, nft }).toLowerCase().includes(' legal ')

  const report = {
    as_of: new Date().toISOString(),
    mode: 'dry-run',
    primary_rail: 'metaplex-core-candy-machine-umi',
    fallback_rail: 'underdog-protocol-rest-devnet',
    base_url: DEVNET_BASE,
    alt_base_url: ALT_BASE,
    key_present: Boolean(key),
    key_path_expected: KEY_PATH,
    mainnet_paid_plan: 'NO-GO until Capital > 0 and Galaxy Mind go',
    project_payload: project,
    nft_payload: nft,
    forbidden_word_legal: forbidden,
    docs: {
      quickstart: 'https://docs.underdogprotocol.com/quickstart',
      create_nft:
        'https://underdog.readme.io/reference/post_v2-projects-t-projectid-nfts',
    },
    next_steps: key
      ? [
          'With free dashboard key present: npm run underdog-create-project -- --confirm',
          'Then: UNDERDOG_PROJECT_ID=<id> npm run underdog-mint-one -- --confirm',
          'Record mintAddress / projectId in intel/ (never the API key)',
        ]
      : [
          'Provision free Underdog **devnet** API key via dashboard (no Galaxy Mind card spend)',
          `Save key chmod 600 to ${KEY_PATH} (or set UNDERDOG_API_KEY)`,
          'Keep Core CM primary — fund AhDmi4AWRVYTrkVfYW2317xz2rgtVCaJxGFxN5bcCfU9 then create-cm-devnet',
        ],
  }

  if (forbidden) {
    console.error('ERROR: payload contains forbidden word')
    process.exitCode = 1
    return
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  const dryPath = path.join(OUT_DIR, 'underdog-dry-run.json')
  fs.writeFileSync(dryPath, JSON.stringify(report, null, 2) + '\n')

  console.log('=== Underdog REST client dry-run ===')
  console.log('base:', DEVNET_BASE)
  console.log('key present:', report.key_present)
  console.log('project name:', project.name)
  console.log('nft name/symbol:', nft.name, nft.symbol)
  console.log('wrote:', dryPath)
  console.log('PASS — scaffold ready; live mint blocked until free API key + --confirm')
}

async function probe() {
  console.log('=== Underdog REST probe (no auth) ===')
  const results = []
  for (const base of [DEVNET_BASE, ALT_BASE]) {
    const r = await probeBase(base)
    results.push(r)
    console.log(JSON.stringify(r))
  }
  for (const url of [
    'https://docs.underdogprotocol.com/quickstart',
    'https://underdog.readme.io/reference/post_v2-projects-t-projectid-nfts',
  ]) {
    try {
      const res = await fetch(url, { method: 'GET' })
      console.log(JSON.stringify({ url, status: res.status, ok: res.ok }))
      results.push({ url, status: res.status, ok: res.ok })
    } catch (e) {
      console.log(JSON.stringify({ url, error: e.message }))
      results.push({ url, error: e.message })
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(OUT_DIR, 'underdog-probe.json'),
    JSON.stringify({ as_of: new Date().toISOString(), results }, null, 2) + '\n',
  )
}

async function authedPost(urlPath, body) {
  const key = loadKey()
  if (!key) {
    throw new Error(
      `Missing Underdog API key. Place free devnet key at ${KEY_PATH} or set UNDERDOG_API_KEY`,
    )
  }
  if (!wantConfirm) {
    throw new Error('Refusing live Underdog write without --confirm')
  }
  const url = `${DEVNET_BASE}${urlPath}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = { raw: text.slice(0, 500) }
  }
  return { status: res.status, ok: res.ok, json }
}

async function createProject() {
  const meta = loadDayPassMeta()
  const body = projectBody(meta)
  console.log('POST', `${DEVNET_BASE}/v2/projects`)
  const result = await authedPost('/v2/projects', body)
  console.log('status', result.status)
  console.log(JSON.stringify(result.json, null, 2).slice(0, 2000))
  if (result.ok || result.status === 201 || result.status === 202) {
    const state = {
      as_of: new Date().toISOString(),
      cluster: 'devnet',
      project: result.json,
      note: 'pubkey/ids only — never store API key here',
    }
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n')
    console.log('wrote', STATE_PATH)
  } else {
    process.exitCode = 1
  }
}

async function mintOne() {
  const projectId =
    process.env.UNDERDOG_PROJECT_ID ||
    (fs.existsSync(STATE_PATH)
      ? String(
          JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'))?.project?.id ||
            JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'))?.project?.projectId ||
            '',
        )
      : '')
  if (!projectId) {
    throw new Error('Set UNDERDOG_PROJECT_ID or run create-project first')
  }
  const meta = loadDayPassMeta()
  const body = nftBody(meta, process.env.UNDERDOG_RECEIVER || null)
  const urlPath = `/v2/projects/t/${projectId}/nfts`
  console.log('POST', `${DEVNET_BASE}${urlPath}`)
  const result = await authedPost(urlPath, body)
  console.log('status', result.status)
  console.log(JSON.stringify(result.json, null, 2).slice(0, 2000))
  if (result.ok || result.status === 200 || result.status === 202) {
    const prev = fs.existsSync(STATE_PATH)
      ? JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'))
      : {}
    const state = {
      ...prev,
      as_of: new Date().toISOString(),
      last_mint: {
        projectId,
        response: result.json,
      },
    }
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n')
    console.log('wrote', STATE_PATH)
  } else {
    process.exitCode = 1
  }
}

try {
  if (mode === 'dry-run') await dryRun()
  else if (mode === 'probe') await probe()
  else if (mode === 'create-project') await createProject()
  else if (mode === 'mint-one') await mintOne()
} catch (e) {
  console.error('ERROR:', e.message)
  process.exitCode = 1
}
