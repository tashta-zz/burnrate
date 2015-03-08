getDayRange = function(startDate, endDate) {
  if (!startDate) { startDate = moment().subtract(1, 'month'); }
  if (!endDate) { endDate = moment().add(1, 'month'); }
  startDate = new Date(moment(startDate).startOf('day'));
  endDate = new Date(moment(endDate).endOf('day'));

  return txs.find({_date: {$gte: startDate, $lte: endDate}})
    .fetch();
};

getDay = function(date) {
  if (!date) { date = new Date(); }
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

time = function(date){
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
};
