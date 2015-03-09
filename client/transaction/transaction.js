Template.transactions.helpers({
  transactions: function(){
    var transactionDate = Session.get("transactionDate");
    var account = Session.get('activeAccount') || 'all-accounts';
    var day = getDay(transactionDate);
    var txs = getTxs(day);
    if (account === 'all-accounts') { return txs; }
    else {
      return txs.filter(function(tx) {
        return tx.account === account;
      });
    }
  },

  formatTime: function(){
    return moment(this['transaction-time']).format('MMMM Do YYYY, h:mm:ss a');
  },

  dollarAmount: function(){
    return this.amount/10000;
  },

  isPending: function(){
    return this['is-pending'];
  }
});
