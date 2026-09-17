#!/usr/bin/env node
/**
 * mintV1 one Day Pass from the Core Candy Machine on **devnet**.
 * Reads addresses from out/devnet-addresses.json (from create-cm-devnet).
 */
import { generateSigner, publicKey } from '@metaplex-foundation/umi'
import { mintV1, fetchCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'
import { transactionBuilder } from '@metaplex-foundation/umi'
import {
  loadUmi,
  readAddresses,
  writeAddresses,
  sigToBase58,
  explorerTx,
  explorerAddr,
  CLUSTER,
} from './lib-umi.mjs'

const umi = loadUmi()
const addrs = readAddresses()
if (!addrs?.candyMachine || !addrs?.collection) {
  console.error('Missing out/devnet-addresses.json — run npm run create-cm-devnet first')
  process.exit(1)
}

const candyMachine = publicKey(addrs.candyMachine)
const collection = publicKey(addrs.collection)

const bal = await umi.rpc.getBalance(umi.identity.publicKey)
console.log('cluster:', CLUSTER)
console.log('authority:', umi.identity.publicKey)
console.log('balance lamports:', bal.basisPoints.toString())
console.log('candyMachine:', addrs.candyMachine)
console.log('collection:', addrs.collection)

const cm = await fetchCandyMachine(umi, candyMachine)
console.log('itemsAvailable:', cm.data.itemsAvailable.toString())
console.log('itemsRedeemed:', cm.data.itemsRedeemed.toString())

const asset = generateSigner(umi)
console.log('minting asset…', asset.publicKey)

const mintTx = await transactionBuilder()
  .add(setComputeUnitLimit(umi, { units: 300_000 }))
  .add(
    mintV1(umi, {
      candyMachine,
      asset,
      collection,
    }),
  )
  .sendAndConfirm(umi)

const mintSig = sigToBase58(mintTx.signature)
const mintRecord = {
  ...addrs,
  lastMint: {
    asset: String(asset.publicKey),
    tx: mintSig,
    at: new Date().toISOString(),
  },
}
writeAddresses(mintRecord)

console.log('mint tx:', explorerTx(mintSig))
console.log('asset:', explorerAddr(String(asset.publicKey)))
console.log(JSON.stringify(mintRecord.lastMint, null, 2))
