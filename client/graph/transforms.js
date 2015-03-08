getGraphTransform = function transform(startDate, endDate) {
  var MONTH = 1000 * 60 * 60 * 24 * 30;
  var key = {
    date: 0,
    balance: 1,
    credit: 2,
    debit: 3,
  };
  var graphs = {};
  var res;
  var accounts;

  if (!startDate) { startDate = new Date(+(new Date()) - MONTH); }
  if (!endDate) { endDate = new Date(+(new Date()) + MONTH); }

  res = txs.find({_date: {$gt: startDate, $lt: endDate}})
    .fetch();

  // No transactions for the queried timerange  
  if (!res.length) { return {}; }
  
  // Infer the accounts from the first day
  accounts = Object.keys(res[0])
    .filter(function(key) { return key !== '_id' && key !== '_date'; });
  accounts
    .forEach(function(account) {
      graphs[account] = [
        // Ordering follows `key`
        ['date'],
        ['balance'],
        ['credit'],
        ['debit'],
      ];
    });
  
  res.forEach(function(day) {
    var date = day._date;
    accounts.forEach(function(account) {
      var data = day[account];
      var graph = graphs[account];
      graph[key.date].push(date);
      graph[key.balance].push(data.balance);
      graph[key.credit].push(data.credit);
      graph[key.debit].push(data.debit);
    });
  });

  return graphs;
}

