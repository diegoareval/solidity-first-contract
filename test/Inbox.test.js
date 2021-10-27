const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { interface, bytecode} = require('../compile')

const INITIAL_MESSAGE = 'hi there!'
let inbox;
let accounts;
beforeEach(async() => {
     // get a list of all accounts
     accounts = await web3.eth.getAccounts();

     // use one of those accounts to deploy the contracts
     inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
     .send({from: accounts[0], gas: 1000000});
})

describe('Inbox', () => {
    it('deploy a contract', () => {
      assert.ok(inbox.options.address)
    });

    it('it has a default message', async () => {
      const message = await inbox.methods.message().call();
      console.log("message", message)
      assert.notStrictEqual(message, INITIAL_MESSAGE);
    })

    it('can change the message', async() => {
     await inbox.methods.setMessage('bye').send({from: accounts[0]});
     const message = await inbox.methods.message().call();
     console.log("message", message);
     assert.strictEqual(message, 'bye');
    })
})