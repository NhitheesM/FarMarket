// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { items } = require("../src/items.json")
const { products } = require("../src/products.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy Ecommerce
  const Ecommerce = await hre.ethers.getContractFactory("Ecommerce")
  const ecommerce = await Ecommerce.deploy()
  await ecommerce.deployed()
  console.log(`Deployed Ecommerce Contract at: ${ecommerce.address}\n`)

  // Deploy Supply Chain
  const FarmingSupplyChain = await hre.ethers.getContractFactory("FarmingSupplyChain")
  const farmingSupplyChain = await FarmingSupplyChain.deploy()
  await farmingSupplyChain.deployed()
  console.log(`Deployed FarmingSupplyChain Contract at: ${farmingSupplyChain.address}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await ecommerce.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }

  // Listing products...

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const transaction = await farmingSupplyChain.connect(deployer).createProduct(
      product.name,
      product.category,
      product.quantity,
      tokens(product.price),
      product.producer
    );

    await transaction.wait();

    console.log(`Created product ${product.id}: ${product.name}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});