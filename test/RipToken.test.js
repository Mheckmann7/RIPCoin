const Token = artifacts.require("RipToken");
require("dotenv").config({ path: "../.env" });

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [sender, receiver] = accounts;
    
    beforeEach(async () => {
        this.RipToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it ("all tokens should be in my account", async () => {
        let instance = this.RipToken;
        let totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(totalSupply);
        //eventually allows us to remove the await keyword, so we don't have to wait for the promise to resolve
    })

    it("is possible to send token between accounts", async () => {
        const sendTokens = 1;
        let instance = this.RipToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(receiver, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return await expect(instance.balanceOf(receiver)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("is not possible to send more tokens than tokens available", async () => {
        let instance = await Token.deployed();
        let balanceOfSender = await instance.balanceOf(sender);

        await expect(instance.transfer(receiver, new BN(balanceOfSender + 1))).to.eventually.be.rejected;
        //balance should be the same 
        return await expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(balanceOfSender);
    });
});