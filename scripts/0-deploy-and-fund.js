const { executeTransaction } = require('@algo-builder/algob');
const { mkParam } = require('./transfer/common');


async function run (runtimeEnv, deployer) {
  console.log('funding basic accounts and deploying credit registry');
  const masterAccount = deployer.accountsByName.get('master');
  const registrar = deployer.accountsByName.get('registrar');
  const borrower1 = deployer.accountsByName.get('borrower1');
  const borrower2 = deployer.accountsByName.get('lender');


  // Accounts can only be active if they poses minimum amont of ALGOs.
  // Here we fund the accounts with 5e6, 5e6 and 1e6 micro AlGOs.
  const message = 'funding account';
  const promises = [
    executeTransaction(deployer, mkParam(masterAccount, registrar.addr, 5e6, { note: message })),
    executeTransaction(deployer, mkParam(masterAccount, borrower1.addr, 5e6, { note: message })),
    executeTransaction(deployer, mkParam(masterAccount, borrower2.addr, 1e6, { note: message }))];
  await Promise.all(promises);


  // deploy credit registry contract
  // const sscInfo = await deployer.deployApp(
  //   'credit_registry_contract.py',
  //   'clear_state_program.py',
  //   {
  //     sender: masterAccount,
  //     localInts: 0,
  //     localBytes: 1, // user credit profile
  //     globalInts: 0,
  //     globalBytes: 1 // registrar address
  //   }, {}
  // );

  // console.log(sscInfo);

  // Opt-In for creator
  // await deployer.optInAccountToApp(creatorAccount, sscInfo.appID, {}, {});
}

module.exports = { default: run };
