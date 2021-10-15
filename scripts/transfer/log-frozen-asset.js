/**
 * Description:
 * This script does a zero transfer to the creator with some data in the notefield.
 */

 const { executeTransaction, balanceOf, runtime } = require('@algo-builder/algob');
 const { types } = require('@algo-builder/web');
 const { appPrefix } = require('./common');

 const createClawbackLogTx = (assetIndex, clawbackAccount, currentHolderAddress, note) => {
   return txparams = {
     type: types.TransactionType.RevokeAsset,
     sign: types.SignType.SecretKey,
     fromAccount: clawbackAccount,
     recipient: currentHolderAddress,
     revocationTarget: currentHolderAddress,
     amount: 0,
     assetID: assetIndex,
     payFlags: { totalFee: 1000, note },
   }
 }

 const moveFrozenAssetWithClawbackParams = (assetIndex, clawbackAccount, currentHolderAddress, targetAddress, note) => {
  return txparams = {
     type: types.TransactionType.RevokeAsset,
     sign: types.SignType.SecretKey,
     fromAccount: clawbackAccount,
     recipient: targetAddress,
     revocationTarget: currentHolderAddress,
     amount: 1,
     assetID: assetIndex,
     payFlags: { totalFee: 1000, note },
   }
  }
 
 
 
 async function run (runtimeEnv, deployer) {
   // query gold ASA from deployer (using checkpoint information),
   const logASA = deployer.asa.get('supplier2LogAsset')
   if (logASA === undefined) {
     console.error('ASA was not deployed. You must run `algob deploy` first.');
     return;
   }
 
   // query accounts from config
   const clawback = deployer.accountsByName.get('registrar');
   const lender = deployer.accountsByName.get('lender');
   //  const registrar = deployer.accountsByName.get('registrar');

   const noteObj = {type: 'repay', amount: 1000, utr: "UTR:23498274140243482357"}
   const note = appPrefix + JSON.stringify(noteObj)
  //  const tokenHolderAddress = clawback.addr
   const tokenHolderAddress = lender.addr
   // log a tx (assumes clawback-address holds the token)
   const txParams = createClawbackLogTx(logASA.assetIndex, clawback, tokenHolderAddress, note)

   // move the frozen token to a new holder
  //  const targetAddress = lender.addr
  //  const txParams = moveFrozenAssetWithClawbackParams(logASA.assetIndex, clawback, tokenHolderAddress, targetAddress, note)

   // execute asset transfer transaction
   await executeTransaction(deployer, txParams );
 
   // this will print the balance
   console.log('clawback:')
   await balanceOf(deployer, clawback.addr, logASA.assetIndex);
   console.log('lender:')
   await balanceOf(deployer, lender.addr, logASA.assetIndex);
 }
 
 module.exports = { default: run };
 