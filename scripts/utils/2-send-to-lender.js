/**
 * In this script we will send the created log-asset to the lender
 * - manually opting them in
 * - sending it to the lender
 * - freezing the asset
 */
async function run (runtimeEnv, deployer) {
  // console.log('Escrow account script execution started!');

  // // RECEIVER_ADDRESS is set in escrow.py when it is compiled from PyTEAL to TEAL
  // const templateParams = {
  //   RECEIVER_ADDRESS: 'WHVQXVVCQAD7WX3HHFKNVUL3MOANX3BYXXMEEJEJWOZNRXJNTN7LTNPSTY'
  // };
  // await deployer.fundLsig('escrow.py',
  //   { funder: deployer.accounts[0], fundingMicroAlgo: 20e6 }, { fee: 1000 }, templateParams);
  // const escrow = await deployer.loadLogic('escrow.py', templateParams);

  // await deployer.addCheckpointKV('User Checkpoint Escrow', `Fund Escrow Account: ${escrow.address()}`);
  // console.log('Escrow account script execution finished!');
}

module.exports = { default: run };
