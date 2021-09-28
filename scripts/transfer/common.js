const { executeTransaction } = require('@algo-builder/algob');
const { types } = require('@algo-builder/web');

exports.executeTransaction = async function (deployer, txnParams) {
  try {
    await executeTransaction(deployer, txnParams);
  } catch (e) {
    console.error('Transaction Failed', e.response ? e.response.error : e);
  }
};

exports.mkParam = function (senderAccount, receiverAddr, amount, payFlags) {
  return {
    type: types.TransactionType.TransferAlgo,
    sign: types.SignType.SecretKey,
    fromAccount: senderAccount,
    toAccountAddr: receiverAddr,
    amountMicroAlgos: amount,
    payFlags: payFlags
  };

};


exports.encodeToNoteFieldBytes = (s) => {
    const enc = new TextEncoder();
    let note = enc.encode(s);  
    let r = Buffer.from(note).toString("base64");
    return r
 };


exports.decodeFromNoteFieldBytes = (note) => {
    const buff = Buffer.from(note, 'base64');
    // decode buffer as UTF-8
    const str = buff.toString('utf-8');
    return str
 };

exports.decodeFromNoteFieldBytesToObject = (note) => {
    const buff = Buffer.from(note, 'base64');
    // decode buffer as UTF-8 and parse
    return JSON.parse(buff.toString('utf-8'));
 };

