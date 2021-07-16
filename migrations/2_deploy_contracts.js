var RipToken = artifacts.require("RipToken.sol");
var RipTokenSale = artifacts.require("RipTokenSale");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(RipToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(RipTokenSale, 1, addr[0], RipToken.address);
    let instance = await RipToken.deployed();
    await instance.transfer(RipTokenSale.address, process.env.INITIAL_TOKENS);
}