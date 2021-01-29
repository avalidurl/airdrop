const { task, HardhatUserConfig } =  require("hardhat/config");
import ("@nomiclabs/hardhat-ethers");
import ("@nomiclabs/hardhat-waffle");
import ("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



task("deploy", "Deploys new token contract")
  .addParam("name", "The name string of the token")
  .addParam("symbol", "The symbol string of the token")
  .setAction(async (args, hre) => {
    // We get the contract to deploy
    const LodeXToken = await hre.ethers.getContractFactory("LodeXToken");
    const lodeXToken = await LodeXToken.deploy(args.name, args.symbol);

    console.log("LodeXToken deployed to:", lodeXToken.address);
  });


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
    },
    ganache: {
      url: "http://127.0.0.1:8555",
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: "0.7.3",
};

module.exports = {
  config
};