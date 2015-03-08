Template.whatIf.events({
  'click #check': function(){
    var activeAccount = Session.get("activeAccount") || null;
    if (activeAccount === 'all-accounts') { activeAccount = null; }
   
    var creditAmount = +$('#credit-amount').val();
    var debitAmount = -+$('#debit-amount').val();
    var date = new Date($('#what-if-date').val()) || new Date();

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
