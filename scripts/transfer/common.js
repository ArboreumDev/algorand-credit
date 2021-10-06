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

exports.appPrefix = "arboreum/v1:j"
// const appPrefixBytes = this.encodeToNoteFieldBytes(this.appPrefix)
// exports.appPrefixBytes

// should be five letters long so that we can cut it from the prefix and serialize the data
const logTypes = {
	CREATE: "CREATE",
	DISBURSE: "DISBUR",
	REPAY: "REPAY",
}
/**
 * 
 * @param {*} s  stringified json to be added to notefiled
 * @returns 
 */
exports.encodeToNoteFieldBytes = (s) => {
    const enc = new TextEncoder();
    let note = enc.encode(s);  
    let r = Buffer.from(note).toString("base64");
    return r
 };

 /**
  * 
  * @param {*} obj to be stringified
  * @param {*} prefix should be "<appname>/<version>:j"
  * @param {*} logType 
  */
exports.objectToNotefieldBytes = (obj, prefix=appPrefix) => {
  // use this for special type prefix 
  // const noteAsString = `${appPrefix}:j${logTypes[logType]}${JSON.stringify(obj)}`
  const noteAsString = `${prefix}:j${JSON.stringify(obj)}`
  return this.encodeToNoteFieldBytes(noteAsString)

}


exports.decodeFromNoteFieldBytes = (note) => {
    const buff = Buffer.from(note, 'base64');
    // decode buffer as UTF-8
    const str = buff.toString('utf-8');
    return str
 };

 /**
  * @param {*} note bytes from note that has been filtered with prefix 
  * @returns 
  * NOTE: prefix structure: appname/version:j<stringifiedJson>
  */
exports.decodeFromPrefixedNoteFieldBytesToObject = (note) => {
    const buff = Buffer.from(note, 'base64');
    // decode buffer as UTF-8 and parse
    const prefixedStr = buff.toString('utf-8');
    // TODO handle if prefix doesnt exist
    const str = prefixedStr.split(':j')[1]
    return JSON.parse(str)
 }


exports.decodeFromNoteFieldBytesToObject = (note, prefix) => {
    const buff = Buffer.from(note, 'base64');
    // decode buffer as UTF-8 and parse
    return JSON.parse(buff.toString('utf-8'));
 };



;


 

