parseDateRange = function(startDate, endDate) {
  if (!startDate) { startDate = moment().subtract(1, 'month'); }
  if (!endDate) { endDate = moment().add(1, 'month'); }
  startDate = new Date(moment(startDate).startOf('day'));
  endDate = new Date(moment(endDate).endOf('day'));

  return [startDate, endDate];
};

getDayRange = function(startDate, endDate) {
  var dates = parseDateRange(startDate, endDate);

  return txs.find({_date: {$gte: dates[0], $lte: dates[1]}})
    .fetch()
    .sort(function(a, b) {
      return new Date(a._date) < new Date(b._date) ? -1 : 1;
    });

};

getDay = function(date) {
  if (!date) { date = new Date(); }
  return getDayRange(date, date);
};

getTxs = function(dayRange) {
  if (!dayRange.length) { return []; }

  return dayRange
    .reduce(function(txs, day) {
      [].push.apply(txs, (day['all-accounts'].txs));
      return txs;
    }, []);
};
