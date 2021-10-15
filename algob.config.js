// NOTE: below we provide some example accounts.
// DON'T this account in any working environment because everyone can check it and use
// the private keys (this accounts are visible to everyone).

// NOTE: to be able to execute transactions, you need to use an active account with
// a sufficient ALGO balance.

/**
   Check our /docs/algob-config.md documentation (https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md) for more configuration options and ways how to
  load a private keys:
  + using mnemonic
  + using binary secret key
  + using KMD daemon
  + loading from a file
  + loading from an environment variable
  + ...
*/

// ## ACCOUNTS USING mnemonic ##
const { mkAccounts, algodCredentialsFromEnv } = require("@algo-builder/algob");
let accounts = mkAccounts([{
  name: "master",
  // This account is created using `make setup-master-account` command from our
  // `/infrastructure` directory. It already has many ALGOs
  // addr: "WWYNX3TKQYVEREVSW6QQP3SXSFOCE3SKUSEIVJ7YAGUPEACNI5UGI4DZCE",
  // mnemonic: "enforce drive foster uniform cradle tired win arrow wasp melt cattle chronic sport dinosaur announce shell correct shed amused dismiss mother jazz task above hospital",

  // one of the accounts that is used by ./sandbox
  addr: "PHZQD5BEJPPNPYQSZ7PGJRUWKNDZ2WRV4DD446BQ7MGOKXRHNJ24PRIJWI",
  mnemonic: "choice earth will mind edge captain hire suspect cross penalty lyrics obtain recall silly raise you differ similar wet relief above phone frame ability spoon"
},
// new accounts copied from algob/examples/asa
// usually created with using `algob gen-accounts`.
{
  name: "registrar",
  addr: "WHVQXVVCQAD7WX3HHFKNVUL3MOANX3BYXXMEEJEJWOZNRXJNTN7LTNPSTY",
  mnemonic: "resist derive table space jealous person pink ankle hint venture manual spawn move harbor flip cigar copy throw swap night series hybrid chest absent art"
}, {
  name: "borrower1",
  addr: "2UBZKFR6RCZL7R24ZG327VKPTPJUPFM6WTG7PJG2ZJLU234F5RGXFLTAKA",
  mnemonic: "found empower message suit siege arrive dad reform museum cake evoke broom comfort fluid flower wheat gasp baby auction tuna sick case camera about flip"
}, {
  name: "lender",
  addr: "EDXG4GGBEHFLNX6A7FGT3F6Z3TQGIU6WVVJNOXGYLVNTLWDOCEJJ35LWJY",
  mnemonic: "brand globe reason guess allow wear roof leisure season coin own pen duck worth virus silk jazz pitch behave jazz leisure pave unveil absorb kick"
},
]);


// ## ACCOUNTS loaded from a FILE ##
const { loadAccountsFromFileSync } = require("@algo-builder/algob");
// const testNetAccounts = loadAccountsFromFileSync("assets/accounts_testnet.yaml");
// accounts = accounts.concat(accFromFile);




/// ## Enabling KMD access
/// Please check https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md#credentials for more details and more methods.

// process.env.$KMD_DATA = "/path_to/KMD_DATA";
// let kmdCred = KMDCredentialsFromEnv();



// ## Algod Credentials
// You can set the credentials directly in this file:

let defaultCfg = {
  host: "http://localhost",
  port: 4001,
  // Below is a token created through our script in `/infrastructure`
  // If you use other setup, update it accordignly (eg content of algorand-node-data/algod.token)
  token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  accounts: accounts,
  // if you want to load accounts from KMD, you need to add the kmdCfg object. Please read
  // algob-config.md documentation for details.
  // kmdCfg: kmdCfg,
};

let purestakeTestNetCfg = {
  host: "https://testnet-algorand.api.purestake.io/ps2",
  port: '',
  token: {
    "X-API-Key": '8WAnt1QscZ94OmRb53Amb9Jq5ZWx06UZ6cJJDVdH'
  },
  // accounts: testNetAccounts // accounts can be passed as an empty array as well
  // accounts: [], // accounts can be passed as an empty array as well
  accounts: accounts
};

// You can also use Environment variables to get Algod credentials
// Please check https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md#credentials for more details and more methods.
// Method 1
process.env.ALGOD_ADDR = "127.0.0.1:4001";
process.env.ALGOD_TOKEN = "algod_token";
let algodCred = algodCredentialsFromEnv();


let envCfg = {
 host: algodCred.host,
 port: algodCred.port,
 token: algodCred.token,
 accounts: accounts
}


module.exports = {
  networks: {
    default: defaultCfg,
    purestake: purestakeTestNetCfg,
    prod: envCfg
  }
};
