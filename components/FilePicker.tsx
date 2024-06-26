"use client"

import React, { useState, DragEvent, ChangeEvent, useEffect } from 'react';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import NftContract from '@/backend/ignition/deployments/chain-80002/artifacts/NftContractModule#NftContract.json';
import address from '@/backend/ignition/deployments/chain-80002/deployed_addresses.json';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import { createWalletClient, custom } from 'viem';
import { polygonAmoy } from 'viem/chains';

interface UploadedData {
  ipfsUrl: string;
  metadataUri: string;
}

const FilePicker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [metadataUri, setMetadataUri] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isTokenCreated, setisTokenCreated] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

  const abi = NftContract.abi;
  const contractAddress = address['NftContractModule#NftContract'];
  const signerAddress = useAccount().address;

  useEffect(() => {
    if (isTokenCreated) {
      toast.success('NFT successfully minted!');
    }
  }, [isTokenCreated]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = Array.from(e.target.files as FileList).find(
      (file) => file.type === 'image/png'
    );
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = Array.from(e.dataTransfer.files).find(
      (file: File) => file.type === 'image/png'
    );
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async (): Promise<UploadedData | null> => {
    try {
      if (!file || !name || !symbol || !description) return null;

      // Step 1: Upload the file to IPFS
      const form = new FormData();
      form.append('file', file);

      const fileUploadOptions = {
        method: 'POST',
        body: form,
        headers: {
          "Authorization": "5da2e84f-bcbb-4eb9-99e6-1c4357fc7a37",
        },
      };

      const fileUploadResponse = await fetch("https://api.nftport.xyz/v0/files", fileUploadOptions);
      const fileUploadResponseJson = await fileUploadResponse.json();
      const uploadedIpfsUrl = fileUploadResponseJson.ipfs_url;

      // Step 2: Upload metadata to IPFS
      const metadata = {
        name,
        symbol,
        description,
        file_url: uploadedIpfsUrl
      };

      const metadataUploadOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: '5da2e84f-bcbb-4eb9-99e6-1c4357fc7a37'
        },
        body: JSON.stringify(metadata)
      };

      const metadataUploadResponse = await fetch('https://api.nftport.xyz/v0/metadata', metadataUploadOptions);
      const metadataUploadResponseJson = await metadataUploadResponse.json();
      const uploadedMetadataUri = metadataUploadResponseJson.metadata_uri;

      // Set the IPFS URL and metadata URI from the responses
      setIpfsUrl(uploadedIpfsUrl);
      setMetadataUri(uploadedMetadataUri);

      return { ipfsUrl: uploadedIpfsUrl, metadataUri: uploadedMetadataUri };
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleNftMint = async () => {
    setisLoading(true);
    try {
      const uploadedData = await handleUpload();
      if (!uploadedData) {
        console.log("No available IPFS URL or Metadata URI");
        return;
      }

      const { ipfsUrl, metadataUri } = uploadedData;

      // Check if window is defined (i.e., if the code is running in a browser environment)
      if (typeof window !== 'undefined' && window.ethereum) {
        // If window is defined and window.ethereum is available, proceed with minting
        const walletClient = createWalletClient({
          chain: polygonAmoy,
          transport: custom(window.ethereum)
        });

        const hash = await walletClient.writeContract({
          chain: polygonAmoy,
          account: signerAddress,
          address: "0xcF58ed04bb3A54c658662d22021772968eDc3e1D",
          abi: abi,
          functionName: 'mintNFT',
          args: [signerAddress, name, symbol, description, ipfsUrl, metadataUri]
        });

        console.log(hash, "Token Created");
        setTxHash(hash);
        setisLoading(false);
        setisTokenCreated(true);
      } else {
        console.error("window.ethereum is not available");
        setisLoading(false);
        setisTokenCreated(false);
      }
    } catch (error) {
      console.error(error, "Error");
      setisLoading(false);
      setisTokenCreated(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Mint Your NFT</h4>
      </CardHeader>
      <CardBody className="grid grid-cols-2 gap-2">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: '2px dashed #ccc',
            borderRadius: '5px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".png"
            style={{ display: 'none' }}
          />
          {file ? <p>Selected file: {file.name}</p> : 
          <p>Drag and drop a .png file here, or click to select</p>
          }
          <button
            onClick={() => {
              const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
              if (fileInput) {
                fileInput.click();
              }
            }}
          >
            Select .png File
          </button>
        </div>
        <div>
          <Input
            className="mb-3"
            placeholder="Enter NFT Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            placeholder="Enter Symbol" 
            className="mb-3" 
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
          <Input 
            placeholder="Enter Description" 
            className="mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </CardBody>
      <CardFooter className="justify-center">
        <Button 
          className="w-full" 
          onClick={handleNftMint}
          isDisabled={!file || !name || !symbol || !description}
          isLoading={isLoading}
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
        >Mint NFT</Button>
      </CardFooter>
      {txHash && (
        <div>
          <p className="pr-2 m-3">Transaction Hash: <a href={`https://www.oklink.com/amoy/tx/${txHash}`} target='_blank'>{txHash}</a></p>
        </div>
      )}
    </Card>
  );
};

export default FilePicker;