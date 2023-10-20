import { ethers } from 'ethers'
import { EthersAdapter, SafeFactory, SafeAccountConfig, EthersTransactionOptions } from '@safe-global/protocol-kit'
import dotenv from 'dotenv'
import path from 'path'

import SafeApiKit from '@safe-global/api-kit'

dotenv.config({path: path.resolve(__dirname, '../.env')})

async function deploy() {
  // https://chainlist.org/?search=goerli&testnets=true
  const RPC_URL='https://base-goerli.blockpi.network/v1/rpc/public'
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

  // Initialize signers
  const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)
  const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY!, provider)
  const owner3Signer = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY!, provider)

  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
  })

  // Initialize API Kit

  const txServiceUrl = 'https://safe-transaction-base-testnet.safe.global/'
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })

  console.log("API Kit initialized.")

  // Initialized Protocol Kit

  const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

  console.log("Protocol Kit initialized.")

  // Deploy a Safe

const safeAccountConfig: SafeAccountConfig = {
  owners: [
    await owner1Signer.getAddress(),
    await owner2Signer.getAddress(),
    await owner3Signer.getAddress()
  ],
  threshold: 2,
  // ... (Optional params)
}

console.log("Getting ready to deploy...")

/* This Safe is tied to owner 1 because the factory was initialized with
an adapter that had owner 1 as the signer. */
const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })

const safeAddress = await safeSdkOwner1.getAddress()

console.log('Your Safe has been deployed:')
console.log(`https://goerli.basescan.org/address/${safeAddress}`)
console.log(`https://app.safe.global/base-gor:${safeAddress}`)

}

deploy().catch((error)=> {
  console.error(error);
  process.exitCode = 1;
})
