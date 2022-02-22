const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    let wallet = ethers.Wallet.createRandom();
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    while (wallet.address >= threshold) {
      wallet = ethers.Wallet.createRandom();
    }

    const signer = ethers.provider.getSigner(0);

    await signer.sendTransaction({ 
      to: wallet.address,
      value: ethers.utils.parseEther("200")
    })

    await game.connect(wallet.connect(ethers.provider)).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
