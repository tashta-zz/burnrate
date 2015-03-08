Template.transactions.helpers({
  transactions: function(){
    var transactionDate = Session.get("transactionDate");
    var day = getDay(transactionDate);
    console.log(day);
    return day.txs;
  }
});
