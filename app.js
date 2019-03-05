const piggy_bank = require('./piggy_bank.js');
const _ = require('lodash');
const yargs = require('yargs');

let transaction_options = {
  decribe: 'Type of transaction',
  demand: true,
  alias: 't'
}

let amount_options = {
  decribe: 'Amount transacted',
  demand: true,
  alias: 'a'
}

let command = yargs
  .command('deposit', 'Deposit money', {
    amount: amount_options
  })
  .command('balance', 'Show account balance')
  .command('transactions', 'Show all transactions')
  .command('withdraw', 'Withdraw money from piggy bank', {amount: amount_options})
  .help()
  .argv._[0]

  if (command === 'deposit') {
    let deposit = piggy_bank.deposit(yargs.argv.a);
    if (deposit) {
      piggy_bank.logSuccessMsg(yargs.argv.a, 'DEPOSIT')
    } else {
      piggy_bank.logUnsuccessMsg(yargs.argv.a, 'DEPOSIT')
    }
  } else if (command === 'balance') {
    let balance = piggy_bank.balance();
    if (balance) {
      console.log(`Your account balance is ${balance}`);
    } else {
      console.log(`Something went wrong getting your account balance`);
    }
  } else if (command === 'transactions') {
    let transactions = piggy_bank.transactions()
    if (transactions) {
      piggy_bank.logTransactions(transactions)
    } else {
      console.log('Something went wrong collecting your transactions.');
    }
  } else if (command === 'withdraw') {
    let withdraw = piggy_bank.withdraw(yargs.argv.a);
    if (withdraw) {
      if (withdraw === 'bankrupt') {
        console.log(`Sorry, your account balance is insufficient to make this transaction.`)
        console.log('Thank you for trusting your piggy bank')
      } else {
        piggy_bank.logSuccessMsg(yargs.argv.a, 'WITHDRAW')
      }
    } else {
      piggy_bank.logUnsuccessMsg(yargs.argv.a, 'WITHDRAW')
    }
  }
