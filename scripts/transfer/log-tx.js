/**
 * Description:
 * This script does a zero transfer to the creator with some data in the notefield.
 */

 const { executeTransaction, balanceOf, runtime } = require('@algo-builder/algob');
 const { types } = require('@algo-builder/web');
 const { appPrefix } = require('./common');

 
 async function run (runtimeEnv, deployer) {
   // query gold ASA from deployer (using checkpoint information),
   const logASA = deployer.asa.get('supplier1LogAsset')
   if (logASA === undefined) {
     console.error('ASA was not deployed. You must run `algob deploy` first.');
     return;
   }
 
   // query accounts from config
   const registrar = deployer.accountsByName.get('registrar');

   const noteObj = {type: 'repay', amount: 1000, utr: "UTR:23498274140243482357"}
   const note = appPrefix + JSON.stringify(noteObj)
 
   // execute asset transfer transaction
   await executeTransaction(deployer, {
     type: types.TransactionType.TransferAsset,
     sign: types.SignType.SecretKey,
     fromAccount: registrar,
     toAccountAddr: registrar.addr,
     amount: 0,
     assetID: logASA.assetIndex,
     payFlags: { totalFee: 1000, note },
   });
 
   // this will print the balance
   await balanceOf(deployer, registrar.addr, logASA.assetIndex);
 }
 
 module.exports = { default: run };
 