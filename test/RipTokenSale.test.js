const TokenSale = artifacts.require("RipTokenSale");
const Token = artifacts.require("RipToken");
require("dotenv").config({ path: "../.env" });

chai = require(".setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [sender, receiver] = accounts;
    it("sender should not have any tokens", async () => {
        let instance = Token.deployed();
        return expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

});