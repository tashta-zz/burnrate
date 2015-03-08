Template.whatIf.events({
  'click #check': function(){
    var amount = -+$('#amount').val();
    var activeAccount = Session.get("activeAccount") || null;
    if (activeAccount === 'all-accounts') { activeAccount = null; }
   
    var newTransaction = mockTx(amount, activeAccount, new Date());

    Session.set('mockTransaction', newTransaction);
  }
})
