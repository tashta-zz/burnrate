getGraphTransform = function transform(dayRange) {
  var key = {
    date: 0,
    balance: 1,
    credit: 2,
    debit: 3,
  };
  var graphs = {};
  var accounts;

  // No transactions for the queried timerange  
  if (!dayRange.length) { return {}; }
  
  // Infer the accounts from the first day
  accounts = Object.keys(dayRange[0])
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
  
  dayRange.forEach(function(day) {
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

