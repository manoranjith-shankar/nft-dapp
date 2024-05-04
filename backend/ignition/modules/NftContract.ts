const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NftContractModule = buildModule("NftContractModule", (m) => {
  const NftContract = m.contract("NftContract");

  return { NftContract };
});

module.exports = NftContractModule;