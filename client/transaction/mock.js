var dayMap = {
  0: 'S',
  1: 'M',
  2: 'T',
  3: 'W',
  4: 'Th',
  5: 'F',
  6: 'Sa',
};

mockTx = function makeTx(amount, account, time) {
  return {
    // Convert dollars -> centocents
    amount: amount * 10000,
    account: account,
    // Mitigate timezone changing date
    'transaction-time': new Date(time).toISOString(),
  };
};

mockReTx = function makeReTx(amount, account, days) {
  return {
    recurring: true,
    amount: amount,
    account: account,
    days: days,
  };
};

mockDayRange = function transform(txs, startDate, endDate) {
  realDays = getDayRange(startDate, endDate);
  if (!realDays.length) { return []; }
  if (!txs || !txs.length) { return realDays; }
  var firstDay = realDays[0];
  var firstTxs = getTxs([firstDay]);
  
  // Guarantee we have the same start/end dates as the dayRange
  var dates = parseDateRange(startDate, endDate);
  var reTxs = txs.filter(function(tx) { return tx.recurring; });
  txs = txs.filter(function(tx) { return !tx.recurring; });
  txs = txs.concat(getTxs(realDays.slice(1)));

  // Use the date from our dayRange to start, as we don't know the actual last value
  var date = startDate ? moment(startDate).startOf('day') : moment(firstDay._date);

  // Create mock recurring txs
  while (date <= dates[1]) {
    var currentDay = dayMap[date.day()];
    var currentDate = date.date();

    reTxs.forEach(function(reTx) {
      if (reTx.days[currentDay] || reTx.days[currentDate]) {
        var mock = mockTx(reTx.amount, reTx.account, date);

        if (date <= date[0]) { firstTxs.push(mock); }
        else { txs.push(mock); }
      }
    });

    date = moment(date).add(1, 'day');
  }

  var accounts = Object.keys(firstDay)
    .filter(function(key) { return !/^(_id|_date|all-accounts)$/.test(key); })
    .map(function(account) {
      return {
        id: account,
        name: account,
        balance: firstDay[account].balance,
      };
    });

  var daysMap = txsToDays(accounts, {
    txs: firstTxs,
    '+txs': txs,
  });

  var days = [];
  var day;
  for (var ix in daysMap) {
    day = daysMap[ix]
    days.push(day);
  }

  return days;
};
