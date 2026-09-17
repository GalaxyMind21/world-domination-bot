#!/usr/bin/env node
/**
 * Create a disposable Solana keypair for Day Pass Core CM on **devnet only**.
 * Writes to ~/.config/world-domination-wallet/ (chmod 600). Never commit.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { generateSigner } from '@metaplex-foundation/umi'
import { WALLET_DIR, KEYPAIR_PATH } from './lib-umi.mjs'

fs.mkdirSync(WALLET_DIR, { recursive: true, mode: 0o700 })
const pubkeyPath = path.join(WALLET_DIR, 'daypass-devnet.pubkey')

if (fs.existsSync(KEYPAIR_PATH) && !process.env.FORCE_NEW) {
  console.log('Already exists:', KEYPAIR_PATH)
  console.log('pubkey:', fs.readFileSync(pubkeyPath, 'utf8').trim())
  console.log('Set FORCE_NEW=1 to rotate.')
  process.exit(0)
}

const umi = createUmi('https://api.devnet.solana.com')
const signer = generateSigner(umi)
fs.writeFileSync(KEYPAIR_PATH, JSON.stringify(Array.from(signer.secretKey)))
fs.chmodSync(KEYPAIR_PATH, 0o600)
fs.writeFileSync(pubkeyPath, `${signer.publicKey}\n`)
console.log('Wrote', KEYPAIR_PATH, '(mode 600)')
console.log('pubkey', signer.publicKey)
console.log('Next: npm run airdrop-devnet')
