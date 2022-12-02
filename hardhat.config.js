require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const { REACT_APP_ALCHEMY_KEY, REACT_APP_PRIVATE_KEY } = process.env
const url = `https://polygon-mumbai.g.alchemy.com/v2/${REACT_APP_ALCHEMY_KEY}`

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();
//
//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });


module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url,
      accounts: [REACT_APP_PRIVATE_KEY]
    }
  },
  paths: {
    artifacts: './src/artifacts'
  }
};
