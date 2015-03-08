Template.transactions.helpers({
  transactions: function(){
    var transactionDate = Session.get("transactionDate");
    var activeAccount = Session.get("activeAccount") || 'all-accounts';
    var day = getDay(transactionDate);
    return day[activeAccount];
  }
});
