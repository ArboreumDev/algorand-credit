const { globalZeroAddress, balanceOf } = require("@algo-builder/algob");

async function run (runtimeEnv, deployer) {
  console.log(deployer.accounts)
  registrar = deployer.accounts[1]
  const asaInfo = await deployer.deployASA(
    'supplier1LogAsset',
    { creator: registrar},
    {
      freeze: registrar.addr,
      manager: registrar.addr,
  })

  console.log(asaInfo);

  b=await balanceOf(deployer, registrar.addr, asaInfo.assetIndex);

  await deployer.addCheckpointKV('User Checkpoint', 'Deploying Log Asset');
  // console.log('Sample script for ASC Funding execution has finished!');
}

module.exports = { default: run };
