// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RipToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Rip Token", "RIP") {
        _mint(msg.sender, initialSupply);
    }
}
