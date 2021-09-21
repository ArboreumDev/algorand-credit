// TODO implement as typescript project
// see how types would look like at the bottom of this file
const { getProgram } = require('@algo-builder/algob');
const { Runtime, AccountStore } = require('@algo-builder/runtime');
const { types, parsing } = require('@algo-builder/web');
const { assert } = require('chai');

const minBalance = BigInt(1e6);
const masterBalance = BigInt(10e6);
const amount = BigInt(1e6);
const fee = 1000;



describe('Credit Profile Registry Test', function () {
  let registrar;
  let borrower;

  let runtime;
  let approvalProgram;
  let clearProgram;
  let appID;

  const callTxnParams = {
    type: types.TransactionType.CallNoOpSSC,
    sign: types.SignType.SecretKey,
    // will be set later
    fromAccount: undefined,
    appID: 0,
    payFlags: { totalFee: fee }
  };

  this.beforeAll(async function () {
    registrar = new AccountStore(minBalance);
    borrower = new AccountStore(minBalance);
    runtime = new Runtime([registrar, borrower]);
    approvalProgram = getProgram('credit_registry_contract.py');
    clearProgram = getProgram('clear_state_program.py');

    // create app
    appID = runtime.addApp({
      sender: registrar.account,
      globalBytes: 1,
      globalInts: 0,
      localBytes: 1,
      localInts: 0
    }, {}, approvalProgram, clearProgram);
    callTxnParams.appID = appID;
    callTxnParams.fromAccount = registrar.account;

    // opt-in to the app
    runtime.optInToApp(registrar.address, appID, {}, {});
    runtime.optInToApp(borrower.address, appID, {}, {});
  });

  function syncAccounts () {
    registrar = runtime.getAccount(registrar.address);
    borrower = runtime.getAccount(borrower.address);
  }

  it('Registrar should be stored on registry', () => {
    const storedAddress = runtime.getGlobalState(appID, 'registrar');

    const registrarPk = parsing.addressToPk(registrar.address);

    // verify global state
    assert.isDefined(storedAddress)
    assert.deepEqual(storedAddress, registrarPk , 'registrar not saved on registry');

  })

});
// import { getProgram } from '@algo-builder/algob';
// import { Runtime, AccountStore } from '@algo-builder/runtime';
// import { types } from "@algo-builder/web";
// import { assert } from "chai";
// import internal from 'stream';
  // typescripted
  // let runtime: Runtime;
  // let approvalProgram: string;
  // let clearProgram: string;
  // const john = new AccountStore(minBalance);
  // let appID: number;

  // const callTxnParams: types.ExecParams = {
  //   type: types.TransactionType.CallNoOpSSC,

