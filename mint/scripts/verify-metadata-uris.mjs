#!/usr/bin/env node
/**
 * Verify Day Pass metadata JSON + image (local always; remote after HQ merge).
 * No spend. No private keys.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MINT = path.resolve(__dirname, '..')
const PLACEHOLDER = 'REPLACE_WITH_HOSTED_IMAGE'

const report = {
  as_of: new Date().toISOString(),
  local: {},
  remote: {},
  status: 'UNKNOWN',
}

const required = [
  'daypass-metadata.json',
  'collection-metadata.json',
  'assets/daypass.png',
]

let localOk = true
for (const rel of required) {
  const p = path.join(MINT, rel)
  const exists = fs.existsSync(p)
  report.local[rel] = { exists, bytes: exists ? fs.statSync(p).size : 0 }
  if (!exists) localOk = false
}

for (const name of ['daypass-metadata.json', 'collection-metadata.json']) {
  const data = JSON.parse(fs.readFileSync(path.join(MINT, name), 'utf8'))
  const img = data.image || ''
  const hasPlaceholder = JSON.stringify(data).includes(PLACEHOLDER)
  const githubRaw = img.includes('raw.githubusercontent.com/GalaxyMind21/world-domination-bot')
  report.local[`${name}.image`] = img
  report.local[`${name}.placeholder`] = hasPlaceholder
  report.local[`${name}.githubRaw`] = githubRaw
  if (hasPlaceholder || !githubRaw) localOk = false
}

const remotes = [
  'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/daypass-metadata.json',
  'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/collection-metadata.json',
  'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/assets/daypass.png',
]

let remoteOk = true
for (const url of remotes) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' })
    report.remote[url] = {
      status: res.status,
      contentType: res.headers.get('content-type') || '',
    }
    if (!res.ok) remoteOk = false
  } catch (e) {
    report.remote[url] = { error: String(e.message || e) }
    remoteOk = false
  }
}

if (localOk && remoteOk) report.status = 'PASS'
else if (localOk) report.status = 'LOCAL_PASS_REMOTE_PENDING'
else report.status = 'FAIL'

const outPath = path.join(MINT, 'out', 'verify-metadata-uris.json')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report, null, 2))
console.log('wrote', outPath)
console.log('status:', report.status)
process.exit(localOk ? 0 : 1)
