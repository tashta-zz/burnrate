Meteor.methods({ txs: function(email, password, mock) {
  return Meteor.wrapAsync(function(cb) {
    var levelApi = new Level(email, password, get, mock);
  
    function get(err, data) {
      if (err) { return cb(err); }

      levelApi.get(process);
    }
    function process(err, data) {
      if (err) { return cb(err); }

      var days = {};
      var totalBalance = 0;
      var accounts = data.accounts.map(function(account) {
        return {
          id: account['account-id'],
          name: account['account-name'],
          balance: account.balance
        };
      });
      var accountMap = accounts.reduce(function(map, account) {
        totalBalance += account.balance;
        map[account.id] = {
          name: account.name,
          balance: account.balance,
        };
        return map;
      }, {});
      
      // Go backwards from the current balance
      for (var i = data.txs.length - 1; i >= 0; i--) {
        var tx = data.txs[i];
        modifyDay(tx);
      } 

      // Reset to the current balance
      totalBalance = 0;
      accounts.forEach(function(account) {
        totalBalance += account.balance;
        accountMap[account.id].balance = account.balance;
      })

      // Go forwards from the current balance 
      data['+txs'].forEach(function(tx) { modifyDay(tx); });
        
      function modifyDay(tx) {
        var amount = tx.amount;
        var type = amount > 0 ? 'credit' : 'debit';
        var account = accountMap[tx['account-id']];
        var day = getDay(tx);

        day['all-accounts'].txs.push(tx);
        day['all-accounts'].balance = totalBalance += amount;
        day['all-accounts'][type] += amount;
        day[account.name].balance = account.balance += amount;
        day[account.name][type] += amount;
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
            balance: account.balance,
            debit: 0,
            credit: 0,
          };
        });
        return day;
      }

      // Update the collection
      txs.remove();
      for (var day in days) { txs.insert(days[day]); }

      cb(null);
    }
  })();
}});
