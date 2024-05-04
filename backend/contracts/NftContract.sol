// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftContract is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("", "") {}

    struct NFTMetadata {
        string name;
        string symbol;
        string description;
        string ipfsNFTImage;
        string ipfsNFTMetadata;
    }

    mapping(uint256 => NFTMetadata) private _tokenMetadata;

    function mintNFT(
        address to,
        string memory name,
        string memory symbol,
        string memory description,
        string memory ipfsNFTImage,
        string memory ipfsNFTMetadata
    ) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _tokenIdCounter += 1;
        
        _setTokenData(tokenId, name, symbol, description, ipfsNFTImage, ipfsNFTMetadata);

        return tokenId;
    }

    function _setTokenData(
        uint256 tokenId,
        string memory name,
        string memory symbol,
        string memory description,
        string memory ipfsNFTImage,
        string memory ipfsNFTMetadata
    ) internal {
        _tokenMetadata[tokenId] = NFTMetadata(name, symbol, description, ipfsNFTImage, ipfsNFTMetadata);
    }

    function getTokenMetadata(uint256 tokenId) external view returns (NFTMetadata memory) {
        return _tokenMetadata[tokenId];
    }
}