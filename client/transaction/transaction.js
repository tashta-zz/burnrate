getDayRange = function(startDate, endDate) {
  var MONTH = 1000 * 60 * 60 * 24 * 30;

  if (!startDate) { startDate = new Date(+(new Date()) - MONTH); }
  else { startDate = new Date(startDate); } // Date is mutated, so must be copied
  if (!endDate) { endDate = new Date(+(new Date()) + MONTH); }
  else { endDate = new Date(endDate); } // Date is mutated, so must be copied
  // Consider entire days, not timestamps
  startDate.setHours(0), startDate.setMinutes(0), startDate.setSeconds(0);
  endDate.setHours(23), endDate.setMinutes(59), endDate.setSeconds(59);

  return txs.find({_date: {$gte: startDate, $lte: endDate}})
    .fetch();
};

getDay = function(date) {
  return getDayRange(date, date);
};

getTx = function(dayRange) {
  if (!dayRange.length) { return []; }

  return dayRange
    .reduce(function(txs, day) {
      [].push.apply(txs, (day['all-accounts'].txs));
      return txs;
    }, []);
};
