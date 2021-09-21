// TODO implement as typescript project
// see how types would look like at the bottom of this file
const { getProgram, convert } = require('@algo-builder/algob');
const { Runtime, AccountStore, expectRuntimeError, RUNTIME_ERRORS } = require('@algo-builder/runtime');
const { types, parsing } = require('@algo-builder/web');
const { assert } = require('chai');

const minBalance = BigInt(1e6);
const masterBalance = BigInt(10e6);
const amount = BigInt(1e6);
const fee = 1000;
const rejectMsg = 'RUNTIME_ERR1007: Teal code rejected by logic';
const creditProfile = '{"Rating": 600/900}'
const bytesToString = (b) => String.fromCharCode.apply(null, b)



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
    appArgs: [],
    accounts: [],
    appID: 0,
    payFlags: { totalFee: fee }
  };

  this.beforeEach(async function () {
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

  describe("Access Control", () => {
    it('Registrar should be stored on registry', () => {
      const storedAddress = runtime.getGlobalState(appID, 'registrar');

      // verify global state
      assert.isDefined(storedAddress)
      assert.deepEqual( storedAddress, parsing.addressToPk(registrar.address), 'registrar not saved on registry')
    })

    it('Registrar can transfer rights to new address', () => { 
      // try reassigning ownership from registrar address
      callTxnParams.appArgs = [ convert.stringToBytes('reassign_registrar') ];
      callTxnParams.accounts = [ borrower.address ]

      runtime.executeTx(callTxnParams)

      syncAccounts()
      const storedAddress = runtime.getGlobalState(appID, 'registrar');
      assert.isDefined(storedAddress)
      assert.deepEqual( storedAddress, parsing.addressToPk(borrower.address), 'registrar entry has not changed')
    })

    it('calls from non-registrar addresses will be rejected', () => {
      // try reassigning ownership from non-registrar address
      callTxnParams.appArgs = [ convert.stringToBytes('reassign_registrar') ];
      callTxnParams.accounts = [ borrower.address ]
      callTxnParams.fromAccount = borrower.account

      assert.throws(() => runtime.executeTx(callTxnParams),  'RUNTIME_ERR1009'); // rejectMsg);

      syncAccounts()
      const storedAddress = runtime.getGlobalState(appID, 'registrar');
      assert.isDefined(storedAddress)
      assert.deepEqual( storedAddress, parsing.addressToPk(registrar.address), 'registrar has changed unexpectedly')
    })
  });

  describe("Credit Profiles:", () => {
    it('Registrar can create profiles in borrower local state', () => {
      assert.isUndefined( runtime.getLocalState(appID, borrower.address, 'credit'))

      // create profile
      callTxnParams.appArgs = [ 
        convert.stringToBytes('new_profile'),
        convert.stringToBytes(creditProfile)
      ];
      callTxnParams.accounts = [ borrower.address ]
      runtime.executeTx(callTxnParams)

      // verify
      syncAccounts()
      const localVal = runtime.getLocalState(appID, borrower.address, 'credit');
      assert.isDefined(localVal)
      assert.deepEqual(localVal, parsing.stringToBytes(creditProfile), 'credit profile not updated') 
      assert.equal(creditProfile, bytesToString(localVal))
 
    });
  });
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

