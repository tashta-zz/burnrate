Meteor.methods({ txs: function(email, password, mock) {
  return Meteor.wrapAsync(function(cb) {
    var levelApi = new Level(email, password, get, mock);
  
    function get(err, data) {
      if (err) { return cb(err); }

      levelApi.get(process);
    }
    function process(err, data) {
      if (err) { return cb(err); }

      var accounts = data.accounts.map(function(account) {
        return {
          id: account['account-id'],
          name: account['account-name'],
          // Convert from centocents -> dollars
          balance: account.balance / 10000,
        };
      });
      var days = txsToDays(accounts, data);

      // Update the collection
      txs.remove({});
      for (var ix in days) { txs.insert(days[ix]); }

      cb(null);
    }
  })();
}});
