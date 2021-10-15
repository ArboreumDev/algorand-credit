const { globalZeroAddress, balanceOf } = require("@algo-builder/algob");

const { encodeToNoteFieldBytes } = require('./transfer/common');
var sha256 = require('js-sha256');

async function run (runtimeEnv, deployer) {
  console.log(deployer.accounts)
  // registrar = deployer.accounts[1]
  // registrar = deployer.accounts[1]
  const registrar = deployer.accountsByName.get('registrar');

  // TODO how to hash that such that its not longer than 32 bytes?
  // const hashed_data = "QmbDihe5MsWE483Ps7xE84MAEfpHjBLxSrGUUxu4VbU9VW"
  // const metadataHash = encodeToNoteFieldBytes(hashed_data)
  // const metadataHash = sha256("sfdsf")
  // note = "testNote"

  // const asaInfo = await deployer.deployASA(
  //   'supplier1LogAsset',
  //   // { creator: registrar, metadataHash, note }, // the metadata will not get picked up if
  //   { creator: registrar},
  //   {
  //     freeze: registrar.addr,
  //     manager: registrar.addr,
  // })

  // console.log(asaInfo);
  const lender = deployer.accountsByName.get('lender');

  const asa2Info = await deployer.deployASA(
    'supplier2LogAsset',
    { creator: registrar},
    {
      clawback: registrar.addr
    }
  )
  console.log(asa2Info);


  b=await balanceOf(deployer, lender.addr, asa2Info.assetIndex);

  // await deployer.addCheckpointKV('User Checkpoint', 'Deploying Log Asset');
  // // console.log('Sample script for ASC Funding execution has finished!');
}

module.exports = { default: run };
