const fs = require('fs')

// date obj
let d = new Date()

// let make_deposit = (deposit) => {
//   fs.writeFileSync('piggy_bank_deposits.json', JSON.stringify(deposit))
// }

let make_transaction = (transaction, file) => {
  fs.writeFileSync(file, JSON.stringify(transaction))
}

let account_details = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file))
  } catch (e) {
    return []
  }
}

let cal = (transactions) => {
  let tot = 0;
  for (let i = 0; i < transactions.length; i++) {
    tot = tot + transactions[i].amount
  }

  return tot
}

let balance = () => {
  // get all deposits and withdraws
  let deposits = account_details('piggy_bank_deposits.json')
  let withdraws = account_details('piggy_bank_withdraws.json')

  let total_deposits = cal(deposits);
  let total_withdraws = cal(withdraws);
  return total_deposits - total_withdraws;
}

let deposit = (amount) => {
  // deposit obj
  let amount_deposit = {
    date_time: d.toLocaleString(),
    amount: amount
  }
  // get the length of the current number of deposits
  let deposits = account_details('piggy_bank_deposits.json')

  deposits.push(amount_deposit)
  make_transaction(deposits, 'piggy_bank_deposits.json')
  return amount_deposit;
}

let withdraw = (amount) => {
  // get the account balance
  let bal = balance()
  if (amount <= bal) {
    // withdraw obj
    let amount_withdraw = {
      date_time: d.toLocaleString(),
      amount: amount
    }
    // get the length of the current number of deposits
    let withdraws = account_details('piggy_bank_withdraws.json')

    withdraws.push(amount_withdraw)
    make_transaction(withdraws, 'piggy_bank_withdraws.json')
    return amount_withdraw;
  } else {
    return 'bankrupt'
  }
}

let transactions = () => {
  // get all deposits and withdraws
  let transactionz = {
    deposits: account_details('piggy_bank_deposits.json'),
    withdraws: account_details('piggy_bank_withdraws.json')
  }

  return transactionz
}

let logSuccessMsg = (amount, transaction) => {
  console.log('');
  console.log(`----- SUCCESSFUL ${transaction} -----`)
  console.log(`Your ${transaction.toLowerCase()} of ${amount} was successful.`)
  console.log(`Your account balance is ${balance()}`)
}

let logUnsuccessMsg = (amount, transaction) => {
  console.log('');
  console.log(`***** UNSUCCESSFUL ${transaction} *****`)
  console.log(`Your ${transaction.toLowerCase()} of ${amount} was unsuccessful.`)
  console.log(`Please try again.`)
}

let logTransactions = (transactions) => {
  console.log('')
  console.log('PIGGY BANK ACCOUNT TRANSACTIONS')
  console.log('')
  console.log(`Account Balance: ${balance()}`)
  console.log('')
  console.log(`Total number of transactions made: ${transactions.deposits.length + transactions.withdraws.length}    Deposits: ${transactions.deposits.length}   Withdraws: ${transactions.withdraws.length}`)
  console.log('')
  console.log('')
  for (let key in transactions) {
    if (transactions.hasOwnProperty(key)) {
        console.log(`----- ${key.toUpperCase()} -----`)
        transactions[key].forEach((transaction) => console.log(`Date: ${transaction.date_time}    Amount: ${transaction.amount}`))
        console.log(`End of ${key.toUpperCase()}`)
        console.log('')
    }
  }
}

module.exports = {
  deposit,
  withdraw,
  balance,
  transactions,
  logSuccessMsg,
  logUnsuccessMsg,
  logTransactions
}
