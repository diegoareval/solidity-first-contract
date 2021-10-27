const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const { interface, bytecode } = require("../compile");
const { nemmonicPhrase, infuraUrl } = require("../config/config");

const provider = new HDWalletProvider(nemmonicPhrase, infuraUrl);

const web3 = new Web3(provider);

const deploy = async () => {
// get all accounts
accounts = await web3.eth.getAccounts();
console.log("attempting to deploy account", accounts[0]);

result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

     console.log("contract deployed at: ", result.options.address)

}

deploy();