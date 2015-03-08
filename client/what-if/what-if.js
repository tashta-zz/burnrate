Template.whatIf.events({
  'click #check': function(){
    var activeAccount = Session.get("activeAccount") || null;
    if (activeAccount === 'all-accounts') { activeAccount = null; }
   
    var creditAmount = +$('#credit-amount').val();
    var debitAmount = -+$('#debit-amount').val();
    var date = new Date(+(new Date($('#what-if-date').val())) + 1000 * 60 * 60 * 24) || new Date();

    var mockTxs = [];
    if (creditAmount) {
      mockTxs.push(mockTx(creditAmount, activeAccount, date));
    }
    if (debitAmount) {
      mockTxs.push(mockTx(debitAmount, activeAccount, date)); 
    }

    Session.set('mockTxs', mockTxs);
  }
})
