const TokenSale = artifacts.require("RipTokenSale");
const Token = artifacts.require("RipToken");
const KycContract = artifacts.require("KycContract");
require("dotenv").config({ path: "../.env" });

chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [sender, receiver] = accounts;
    it("sender should not have any tokens", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it(" all tokens should be in sale contract by default", async () => {
        let instance = await Token.deployed();
        let tokensInSaleContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(tokensInSaleContract).to.be.a.bignumber.equal(totalSupply);
    })
    it(" should be possible to buy tokens", async () => {
        let instance = await Token.deployed();
        let saleInstance = await TokenSale.deployed();
        let balanceBefore = await instance.balanceOf.call(receiver);
        await expect(saleInstance.sendTransaction({from: receiver, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBefore + 1).to.be.bignumber.equal(await instance.balanceOf.call(receiver));
    })

});