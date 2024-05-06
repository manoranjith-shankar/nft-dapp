"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useAccount } from 'wagmi';
import NftContract from '@/backend/ignition/deployments/chain-80002/artifacts/NftContractModule#NftContract.json';
import address from '@/backend/ignition/deployments/chain-80002/deployed_addresses.json';
import publicClient from './hooks/usePublicClient';

// Define types for token metadata
interface TokenMetadata {
  ipfsNFTImage: string;
  name: string;
  symbol: string;
  description: string;
}

// Define types for contract ABI and address
const abi = NftContract.abi;
const contractAddress = address['NftContractModule#NftContract'];

// Component to fetch and display owned tokens
const FetchOwnedTokens: React.FC = () => {
  const [ownedTokens, setOwnedTokens] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const signerAddress = useAccount().address;

  useEffect(() => {
    const fetchOwnedTokens = async () => {
      setLoading(true);
      try {
        const tokens = await publicClient.readContract({
          address: "0xcF58ed04bb3A54c658662d22021772968eDc3e1D",
          abi: abi,
          functionName: 'getOwnedTokens',
          args: [signerAddress]
        });
        setOwnedTokens(tokens as number[]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching owned tokens:', error);
        setLoading(false);
      }
    };

    fetchOwnedTokens();
  }, [signerAddress]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && ownedTokens.length === 0 && <p>No tokens owned</p>}
      {!loading && ownedTokens.length > 0 && (
        <div className='grid grid-cols-4 gap-4'>
          {ownedTokens.map(tokenId => (
            <TokenCard key={tokenId} tokenId={tokenId} />
          ))}
        </div>
      )}
    </div>
  );
};

// Component to display token card
const TokenCard: React.FC<{ tokenId: number }> = ({ tokenId }) => {
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);

  useEffect(() => {
    const fetchTokenMetadata = async () => {
      try {
        const metadata = await publicClient.readContract({
          address: "0xcF58ed04bb3A54c658662d22021772968eDc3e1D",
          abi: abi,
          functionName: 'getTokenMetadata',
          args: [tokenId]
        });
        setTokenMetadata(metadata as TokenMetadata);
      } catch (error) {
        console.error(`Error fetching metadata for token ${tokenId}:`, error);
      }
    };

    fetchTokenMetadata();
  }, [tokenId]);

  return (
    <Card className="py-4 max-w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={tokenMetadata ? tokenMetadata.ipfsNFTImage : ''}
          width={270}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h4 className="font-bold text-large">{tokenMetadata ? tokenMetadata.name : 'Loading...'}</h4>
        <p className="text-tiny uppercase font-bold">#{tokenMetadata ? tokenMetadata.symbol : 'Loading...'}</p>
        <small className="text-default-500">{tokenMetadata ? tokenMetadata.description : 'Loading...'}</small>
        <p className="text-cyan-600 mt-1 text-sm hover:underline">
          <a href={`https://www.oklink.com/amoy/address/${contractAddress}`} target='_blank'>
            {contractAddress}
          </a>
        </p>
      </CardBody>
    </Card>
  );
};

export default FetchOwnedTokens;