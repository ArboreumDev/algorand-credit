(slightly adapted readme:)
* First you need to set the configuration in `algob.config.js` file:

  - Specify accounts you want to use, there are multiple ways to do it. You can see [here](/docs/algob-config.md)
  - If you are using Testnet, use https://bank.testnet.algorand.network/ to fund address.
  - If you are using Private Network, use `goal clerk send`
  (https://developer.algorand.org/docs/reference/cli/goal/clerk/send/) to fund address.

  - After this specify your `network configurations`.

>DJU:
The algob.config.js in this repo matches the local network that one gets when following the instructions in the
[algob/infrastructure]( https://github.com/scale-it/algo-builder/tree/master/infrastructure) directory. 

To start it cd into then do

➜  ~ goal network start -r ./node_data

> this doesnt work with the indexer...

instead do (in the same location:)

➜  ~ make sandbox-up

* Deploy ASA and Smart Contracts:

  - `algob deploy`

* Scripts ran with deploy command will store checkpoints in artifacts directory. If a script already has a checkpoint it won’t be run again unless `--force | -f` flag is provided to deploy command.

  - `algob deploy -f`

*  To interact with your deployments you can create a script and run it using:

  - `algob run scripts/path_to/file1`
  - Don’t use algob run for deployments. This should be used only for auxiliary scripts, like ad-hock transactions (example: draining an account).
  existing scripts:
    - log-tx.js: Makes a zero-asset transfer from the registrar to themself, with an object in the note-field 
    - read-logs.js: initializes an indexer and demonstrates how to search for all log-txs or just the ones of a certain type

* Run tests:

  - `algob test` (runs mocha in project root)

Directory Structure:

* `assets/`: Directory for assets and contracts files:
    - `accounts_user.yaml` : It has sample accounts
    - `asa.yaml` : It has sample specifications for Algorand Standard Assets (ASA)
    - `credit_registry_contract.py`: Registry to write credit-profiles to user local state

* `scripts/`: Directory for scripts to deploy and run your assets and contracts:
    - `0-deploy-and-fund.js` : Deploys the credit registry and funds some users
    - `1-sampleScript.js` : This script deploys the log-asset
    - `2-escrow-account.js`: ~This script funds an escrow contract with a hardcoded template parameter (passed in script)~

* `test/`: Directory for test files for testing your assets and smart contracts:
    - `credit-test.js` : Testing Access control and writing to local user storage

* `algob.config.js`: Algob configuration file

Before writing smart contracts in PyTEAL:

* Please follow standard instuctions about [PyTEAL Setup](https://github.com/scale-it/algo-builder/blob/master/README.md#pyteal)
* For passing template parameters dynamically in PyTEAL contract you will need to add [`algobpy`](https://github.com/scale-it/algo-builder/tree/master/examples/algobpy) in your project directory.
    - Read more about usage of `algobpy` and passing template parameters in /scripts [here](https://github.com/scale-it/algo-builder/blob/master/docs/guide/py-teal.md#external-parameters-support)
* PyTEAL supports `Tmpl` fuction which can replace value with a constant and `algob` supports these replacements. To read more about TMPL Placeholder Support click [here](https://github.com/scale-it/algo-builder/blob/master/docs/guide/py-teal.md#tmpl-placeholder-support)