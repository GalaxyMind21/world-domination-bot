#!/usr/bin/env node
/**
 * Create Core Collection + Core Candy Machine (Hidden Settings) on **Solana devnet**.
 * Supply 100 Day Pass. Utility = same-week email brief (not equity).
 * Requires funded disposable keypair (npm run airdrop-devnet).
 */
import crypto from 'node:crypto'
import { generateSigner, some } from '@metaplex-foundation/umi'
import { createCollection } from '@metaplex-foundation/mpl-core'
import { create } from '@metaplex-foundation/mpl-core-candy-machine'
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'
import {
  loadUmi,
  writeAddresses,
  readAddresses,
  sigToBase58,
  explorerTx,
  explorerAddr,
  DAYPASS_METADATA_URI,
  COLLECTION_METADATA_URI,
  SUPPLY,
  CLUSTER,
  KEYPAIR_PATH,
} from './lib-umi.mjs'

const umi = loadUmi()
const authority = umi.identity.publicKey

const bal = await umi.rpc.getBalance(authority)
console.log('cluster:', CLUSTER)
console.log('authority:', authority)
console.log('balance lamports:', bal.basisPoints.toString())
console.log('keypair file:', KEYPAIR_PATH)
if (Number(bal.basisPoints) < 50_000_000) {
  console.error('Need >= ~0.05 SOL on devnet. Run: npm run airdrop-devnet')
  process.exit(1)
}

const existing = readAddresses()
if (existing?.candyMachine && !process.env.FORCE_NEW) {
  console.log('Addresses already recorded in out/devnet-addresses.json')
  console.log(JSON.stringify(existing, null, 2))
  console.log('Set FORCE_NEW=1 to create another CM.')
  process.exit(0)
}

// Hidden Settings: all Day Passes share the same utility metadata URI.
const revealPayload = JSON.stringify([
  { name: 'World Domination Day Pass', uri: DAYPASS_METADATA_URI },
])
const hash = new Uint8Array(crypto.createHash('sha256').update(revealPayload).digest())

const collection = generateSigner(umi)
console.log('Creating Core collection…', collection.publicKey)
const colTx = await createCollection(umi, {
  collection,
  name: 'World Domination Day Pass',
  uri: COLLECTION_METADATA_URI,
}).sendAndConfirm(umi)
const colSig = sigToBase58(colTx.signature)
console.log('collection tx:', explorerTx(colSig))

const candyMachine = generateSigner(umi)
console.log('Creating Core Candy Machine…', candyMachine.publicKey)
const createBuilder = await create(umi, {
  candyMachine,
  collection: collection.publicKey,
  collectionUpdateAuthority: umi.identity,
  itemsAvailable: SUPPLY,
  isMutable: true,
  authority: authority,
  hiddenSettings: some({
    name: 'World Domination Day Pass #$ID+1$',
    uri: DAYPASS_METADATA_URI,
    hash,
  }),
})

const cmTx = await createBuilder
  .prepend(setComputeUnitLimit(umi, { units: 400_000 }))
  .sendAndConfirm(umi)
const cmSig = sigToBase58(cmTx.signature)
console.log('candy machine tx:', explorerTx(cmSig))

const record = {
  cluster: CLUSTER,
  createdAt: new Date().toISOString(),
  authority: String(authority),
  collection: String(collection.publicKey),
  candyMachine: String(candyMachine.publicKey),
  itemsAvailable: SUPPLY,
  storage: 'hiddenSettings',
  metadataUri: DAYPASS_METADATA_URI,
  collectionMetadataUri: COLLECTION_METADATA_URI,
  createCollectionTx: colSig,
  createCandyMachineTx: cmSig,
  notes:
    'Devnet scaffold only. Utility = DAYPASS email brief. Not equity. No mainnet.',
}
writeAddresses(record)
console.log('Wrote out/devnet-addresses.json')
console.log(JSON.stringify(record, null, 2))
console.log('collection:', explorerAddr(record.collection))
console.log('candyMachine:', explorerAddr(record.candyMachine))
console.log('Next: npm run mint-one-devnet')
