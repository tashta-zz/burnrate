/** Transform an array of transactions to an array of days
 *  @param {accounts} - A tracking object for open accounts, must include an id, name, and balance
 *  @param {data} - Transactions (past and future: txs, +txs)
 */
txsToDays = function(accounts, data) {
  var totalBalance = 0;
  var days = {};
  var accountMap = accounts.reduce(function(map, account) {
    totalBalance += account.balance;
    map[account.id] = {
      name: account.name,
      balance: account.balance,
    };
    return map;
  }, {});
      
  // Sort txs
  data.txs.sort(txsSort);
  data['+txs'].sort(txsSort);
  
  function txsSort(a, b) { 
    return new Date(a['transaction-time']) < new Date(b['transaction-time']) ? -1 : 1;
  };

  // Go backwards from the current balance
  for (var i = data.txs.length - 1; i >= 0; i--) {
    var tx = data.txs[i];
    modifyDay(tx, false);
  } 

  // Reset to the current balance
  totalBalance = 0;
  accounts.forEach(function(account) {
    totalBalance += account.balance;
    accountMap[account.id].balance = account.balance;
  })

  // Go forwards from the current balance 
  data['+txs'].forEach(function(tx) { modifyDay(tx, true); });

  return days;

  function modifyDay(tx, isFuture) {
    // Convert from centocents -> dollars
    var amount = tx.amount / 10000;
    var type = amount > 0 ? 'credit' : 'debit';
    var account = accountMap[tx['account'] || tx['account-id']];
    var day = getDay(tx);

    tx.account = account.name;
    day['all-accounts'].txs.push(tx);
    day['all-accounts'][type] += Math.abs(amount);
    day[account.name][type] += Math.abs(amount);
    if (isFuture) {
      // Calculate the total for this day, and update the balances
      day['all-accounts'].balance = totalBalance += amount;
      day[account.name].balance = account.balance += amount;
    } else {
      // Calculate the total for yesterday
      totalBalance -= amount;
      account.balance -= amount;
    }
  } 
  function getDay(tx) {
    // TODO: Calculate day from client's timezone
    var time = tx['transaction-time'].slice(0, 10);
    var day = days[time] = days[time] || {
      '_date': new Date(time),
      'all-accounts': {
        balance: totalBalance,
        debit: 0,
        credit: 0,
        txs: [],
      },
    };
    accounts.forEach(function(account) {
      day[account.name] = day[account.name] || {
        balance: accountMap[account.id].balance,
        debit: 0,
        credit: 0,
      };
    });
    return day;
  }
};
