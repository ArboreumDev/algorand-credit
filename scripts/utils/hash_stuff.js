var sha256 = require('js-sha256');
/**
 * In this script we will fund an escrow contract. The escrow contract
 * ensures the payment is made out(from the escrow) to a specific receiver only.
 * This receiver address is hardcoded in the smart contract, and can be passed
 * dynamically to the contract using fundLsig function (passed as a template parameter)
 */
async function run (runtimeEnv, deployer) {
    test_data = "sdfsdf"
    // const metadataHash = sha256(test_data)
    // const metadataHash = sha256.hex(test_data)
    // const metadataHash = sha256.array(test_data)
    // const metadataHash = sha256.digest(test_data)
    // const metadataHash = sha256.arrayBuffer(test_data)

    console.log(sha256(test_data))
    console.log(sha256.hex(test_data))
    console.log(sha256.array(test_data))
    console.log(sha256.digest(test_data))
    console.log(sha256.arrayBuffer(test_data))
}

module.exports = { default: run };

