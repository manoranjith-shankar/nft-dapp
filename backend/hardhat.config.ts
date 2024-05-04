import "@nomicfoundation/hardhat-toolbox";

const dotenv = require("dotenv");
dotenv.config();
const priv_key = process.env.PRIV_KEY;
const api_key = process.env.API_KEY;

module.exports = {
  solidity: "0.8.24",
  networks: {
    amoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${api_key}`,
      accounts: [priv_key],
    },
  },
};
