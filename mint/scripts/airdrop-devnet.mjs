#!/usr/bin/env node
/**
 * Request public Solana **devnet** faucet SOL for the disposable Day Pass keypair.
 * No mainnet. No Galaxy Mind spend.
 */
import { sol } from '@metaplex-foundation/umi'
import { loadUmi, explorerAddr } from './lib-umi.mjs'

const SOL_AMOUNT = Number(process.env.AIRDROP_SOL || '2')

const umi = loadUmi()
const pk = umi.identity.publicKey
console.log('cluster: devnet')
console.log('pubkey:', pk)
console.log('explorer:', explorerAddr(pk))

const before = await umi.rpc.getBalance(pk)
console.log('balance before:', before.basisPoints.toString(), 'lamports')

try {
  console.log(`Requesting airdrop of ${SOL_AMOUNT} SOL via RPC…`)
  const sig = await umi.rpc.airdrop(pk, sol(SOL_AMOUNT), { commitment: 'confirmed' })
  console.log('airdrop sig:', typeof sig === 'string' ? sig : JSON.stringify(sig))
} catch (err) {
  console.error('RPC airdrop failed:', err?.message || err)
  console.error('Fallback: open https://faucet.solana.com/ and request for', String(pk))
  process.exitCode = 1
}

const after = await umi.rpc.getBalance(pk)
console.log('balance after:', after.basisPoints.toString(), 'lamports')
if (after.basisPoints === 0n || after.basisPoints === 0) {
  console.error('Still zero balance — create/mint blocked until faucet succeeds.')
  process.exitCode = 1
}
