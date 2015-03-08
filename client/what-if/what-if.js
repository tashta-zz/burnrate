Template.whatIf.events({
  'click #check': function(){
    var amount = $('#amount').val();
    var activeAccount = Session.get("activeAccount") || 'all-accounts';
    var newTransaction = mockTx(amount, activeAccount, new Date());
    Session.set('mockTransaction', newTransaction);
  }
})