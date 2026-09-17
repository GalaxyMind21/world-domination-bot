/**
 * Shared Umi helpers for Day Pass Core CM (devnet only).
 * Keypair lives under ~/.config/world-domination-wallet/ — never commit it.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from '@metaplex-foundation/umi'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'
import { base58 } from '@metaplex-foundation/umi/serializers'

export const DEVNET_RPC =
  process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com'

export const WALLET_DIR = path.join(
  os.homedir(),
  '.config',
  'world-domination-wallet',
)
export const KEYPAIR_PATH =
  process.env.DAYPASS_DEVNET_KEYPAIR ||
  path.join(WALLET_DIR, 'daypass-devnet-keypair.json')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ADDRESSES_PATH = path.resolve(
  __dirname,
  '..',
  'out',
  'devnet-addresses.json',
)

/** Official raw metadata URI (public HQ). Image still placeholder. */
export const DAYPASS_METADATA_URI =
  process.env.DAYPASS_METADATA_URI ||
  'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/daypass-metadata.json'

export const COLLECTION_METADATA_URI =
  process.env.COLLECTION_METADATA_URI ||
  'https://raw.githubusercontent.com/GalaxyMind21/world-domination-bot/main/mint/collection-metadata.json'

export const SUPPLY = 100
export const CLUSTER = 'devnet'

export function loadUmi() {
  if (!fs.existsSync(KEYPAIR_PATH)) {
    throw new Error(
      `Missing disposable keypair at ${KEYPAIR_PATH}. Run: node scripts/gen-keypair-devnet.mjs`,
    )
  }
  const secret = JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf8'))
  if (!Array.isArray(secret) || secret.length < 64) {
    throw new Error(`Invalid keypair JSON at ${KEYPAIR_PATH}`)
  }
  const umi = createUmi(DEVNET_RPC)
    .use(mplCore())
    .use(mplCandyMachine())
  const kp = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(secret))
  umi.use(signerIdentity(createSignerFromKeypair(umi, kp)))
  return umi
}

export function sigToBase58(signature) {
  return base58.deserialize(signature)[0]
}

export function readAddresses() {
  if (!fs.existsSync(ADDRESSES_PATH)) return null
  return JSON.parse(fs.readFileSync(ADDRESSES_PATH, 'utf8'))
}

export function writeAddresses(data) {
  fs.mkdirSync(path.dirname(ADDRESSES_PATH), { recursive: true })
  fs.writeFileSync(ADDRESSES_PATH, JSON.stringify(data, null, 2) + '\n')
}

export function explorerTx(sig) {
  return `https://explorer.solana.com/tx/${sig}?cluster=devnet`
}

export function explorerAddr(addr) {
  return `https://explorer.solana.com/address/${addr}?cluster=devnet`
}

export { publicKey }
