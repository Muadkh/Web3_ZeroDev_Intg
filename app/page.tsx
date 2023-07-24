import Image from 'next/image'
import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'
require('dotenv').config();
export default async function Home() {

const { Contract, Wallet } = require('ethers')
const { getZeroDevSigner } = require('@zerodevapp/sdk')
const address:string=""
const balance=0

const projectId = process.env.PROJECT_ID
const pkey= process.env.PRIVATE_KEY
console.log(pkey)
const wallet = new Wallet(pkey)
console.log(Wallet)

const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
const contractABI = [
  'function mint(address _to) public',
  'function balanceOf(address owner) external view returns (uint256 balance)'
]

const main = async () => {
  const signer = await getZeroDevSigner({
    projectId,
   owner: wallet,
  })

  const address = await signer.getAddress()
  console.log('My address:', address)

  const nftContract = new Contract(contractAddress, contractABI, signer)

  const receipt = await nftContract.mint(address)
  await receipt.wait()
  console.log(`NFT balance: ${await nftContract.balanceOf(address)}`)
}

main().then(() => process.exit(0))



  return (
   <>
   
   <div className='flex items-center justify-center w-32 h-40 bg-gray-400 m-auto'>
   <button className=' bg-blue-600 '>Connect</button>
   <h1>{address}</h1>

   </div>
   
   </>
  )
}
