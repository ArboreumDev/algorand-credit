/**
 * Description:
 * This script instantiates the indexer, searches for log-transactions and displays the content of the note field
 */

 const { executeTransaction, balanceOf, runtime } = require('@algo-builder/algob');
 const { types } = require('@algo-builder/web');
 const algosdk = require('algosdk');
const { 
    encodeToNoteFieldBytes, decodeFromNoteFieldBytes, appPrefix,
    decodeFromPrefixedNoteFieldBytesToObject 
} = require('./common');


 async function run (runtimeEnv, deployer) {
   // query log ASA from deployer (using checkpoint information),
   const logASA = deployer.asa.get('supplier1LogAsset')
   if (logASA === undefined) {
     console.error('ASA was not deployed. You must run `algob deploy` first.');
     return;
   }
    const indexer_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const indexer_server = "http://localhost";
    const indexer_port = 8980;

    const indexerClient = new algosdk.Indexer(indexer_token, indexer_server, indexer_port);

    // get all logs
    console.log('looking for all asset transfer transactions...')
    let {transactions} = await indexerClient.lookupAssetTransactions(logASA.assetIndex)
        .txType('axfer') // show transfers only
        .do()
    console.log('found ', transactions.length, ' log events')
    console.log('Decrypting last note field...')
    let tx = transactions[transactions.length-1]
    // console.log(Object.keys(tx))
    console.log(decodeFromNoteFieldBytes(tx.note))
    // console.log(encodeToNoteFieldBytes('testString'), tx.note)

    // or only the ones with a given prefix
    // console.log('looking for prefix:', repay_prefix)
    // const repay_prefix = encodeToNoteFieldBytes('{"type":"repay",')
    const appPrefixBytes = encodeToNoteFieldBytes(appPrefix)
    console.log('looking for prefix:', appPrefixBytes, ` =>(${appPrefix})`)
    const txInfo = await indexerClient.lookupAssetTransactions(logASA.assetIndex)
        .txType('axfer') // show transfers only
        // .notePrefix(repay_prefix)
        .notePrefix(appPrefixBytes)
        .do()
    if (txInfo.transactions.length) {
        console.log('...looking at first example:')
        tx = txInfo.transactions[0]
        try {
            // const noteObject = JSON.parse(raw)
            const noteObject = decodeFromPrefixedNoteFieldBytesToObject(tx.note)
            console.log(noteObject)
        }
        catch (err) {
            rawStr = decodeFromNoteFieldBytes(tx.note)
            console.log('failure to decode:',tx.note)
            console.log('raw string :', rawStr)
        }
    } else {
        console.log('None found')
    }
 }
 
 module.exports = { default: run };
 