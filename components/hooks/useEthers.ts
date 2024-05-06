import { ethers } from 'ethers';
import NftContract from '@/backend/ignition/deployments/chain-80002/artifacts/NftContractModule#NftContract.json'
import address from '@/backend/ignition/deployments/chain-80002/deployed_addresses.json'

const abi = NftContract.abi;
const contractAddress = address['NftContractModule#NftContract'];

let provider;
  if (typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
const signer = provider.getSigner();

//{To be Fixed}
const contract = new ethers.Contract(contractAddress, abi, signer);

const useEthers = [ provider, signer, contract, contractAddress, abi ];

export default useEthers;