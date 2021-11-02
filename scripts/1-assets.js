const { globalZeroAddress, balanceOf } = require("@algo-builder/algob");
const { executeTransaction } = require('@algo-builder/algob');
const { types } = require('@algo-builder/web');
// const { accounts } = require('./common/accounts.js');

const { encodeToNoteFieldBytes } = require('./transfer/common');
var sha256 = require('js-sha256');

async function run (runtimeEnv, deployer) {
  console.log(deployer.accounts)

  // CODE to deploy a USDC-like ASA
  const master = deployer.accountsByName.get('master');
  const asaInfo = await deployer.deployASA(
    'usdc',
    { creator: master},
    {
      // clawback: registrar.addr
    }
  )
  console.log(asaInfo);

  // // CODE to optIn possible other actors
  // const registrar = deployer.accountsByName.get('registrar');
  const borrower = deployer.accountsByName.get('borrower1');
  const lender = deployer.accountsByName.get('lender');

  // CODE to fund other accounts with USDC
  await deployer.optInAccountToASA(asaInfo.assetIndex, 'registrar', { totalFee: 1000 });
  await deployer.optInAccountToASA(asaInfo.assetIndex, 'borrower1', { totalFee: 1000 });
  await deployer.optInAccountToASA(asaInfo.assetIndex, 'lender', { totalFee: 1000 });

  const fundTx1 = {
    type: types.TransactionType.TransferAsset,
    sign: types.SignType.SecretKey,
    fromAccount: master,
    toAccountAddr: lender.addr,
    amount: 200,
    assetID: asaInfo.assetIndex,
    payFlags: { totalFee: 1000 }
  }

  const message = 'funding account';
  const promises = [
    executeTransaction(deployer, [fundTx1])
  ]
  await Promise.all(promises);

  await balanceOf(deployer, lender.addr, asaInfo.assetIndex);

  await deployer.addCheckpointKV('User Checkpoint', 'Deployed USDC MOCK-Asset');
  console.log('Sample script for Mock-USDC Creation has finished!');
}

module.exports = { default: run };
