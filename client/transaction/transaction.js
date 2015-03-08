Template.transactions.helpers({
  transactions: function(){
    var transactionDate = Session.get("transactionDate");
    var day = getDay(transactionDate);
    if ((day !== undefined) && (day.length > 0)){
      var activeAccount = Session.get("activeAccount") || 'all-accounts';
      var dayAccount = day[0][activeAccount];
      return dayAccount.txs || [];
    }
  },

  formatTime: function(){
    return moment(this['transaction-time']).format('MMMM Do YYYY, h:mm:ss a');
  },

  isPending: function(){
    return this['is-pending'];
  }
});
