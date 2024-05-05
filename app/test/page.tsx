"use client"

import useEthers from "@/components/hooks/useEthers";
import { ethers } from 'ethers';
import NftContract from '@/backend/ignition/deployments/chain-80002/artifacts/NftContractModule#NftContract.json'
import address from '@/backend/ignition/deployments/chain-80002/deployed_addresses.json'
import { useAccount } from 'wagmi';

const Page = () => {

  const [provider, signer, contract, contractProvider] = useEthers;
  const abi = NftContract.abi;
  const contractAddress = address['NftContractModule#NftContract'];
  const signerAddress = useAccount().address;

  const contract1 = new ethers.Contract(contractAddress, abi, signer);
  const contract2 = new ethers.Contract(contractAddress, abi, provider);

  const handleRequest = async () => {
    try {
      const tx = await contract2.balanceOf(
        signerAddress
      );
      const tx1 = await contract2.getTokenMetadata(
        5
      );
      console.log(tx, "1");
      console.log(tx1, "2");
    } catch (error) {
      console.error(error, "Error");
    }
  };

  console.log(contract1, "contract")
  console.log(signer, "signer")
  console.log(abi, "abi")

  return (
    <div>
      <button onClick={handleRequest}>Mint NFT</button>
    </div>
  );
};

export default Page;