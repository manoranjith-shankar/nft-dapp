"use client"

import useEthers from "@/components/hooks/useEthers";
import { ethers } from 'ethers';
import NftContract from '@/backend/ignition/deployments/chain-80002/artifacts/NftContractModule#NftContract.json'
import address from '@/backend/ignition/deployments/chain-80002/deployed_addresses.json'

const Page = () => {

  const [provider, signer, contract] = useEthers;
  const abi = NftContract.abi;
  const contractAddress = address['NftContractModule#NftContract'];
  const contract1 = new ethers.Contract(contractAddress, abi, signer);
  const contract2 = new ethers.Contract(contractAddress, abi, provider);

  const handleRequest = async () => {
    try {
      const metadata = await contract2.getTokenMetadata(1);
      console.log(metadata, "Token Metadata");
    } catch (error) {
      console.error(error, "Error");
    }
  };

  console.log(contract, "contract")
  console.log(signer, "signer")
  console.log(abi, "abi")

  return (
    <div>
      <button onClick={handleRequest}>Mint NFT</button>
    </div>
  );
};

export default Page;