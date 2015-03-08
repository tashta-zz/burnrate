Session.setDefault('activeAccount', 'all-accounts');

Template.accounts.events({
  'click .js-account': function(e, t){
    var activeAccount = $(e.currentTarget).val();
    Session.set('activeAccount', activeAccount)
  }
});

Template.accounts.helpers({
  'accounts': function(){
    var today = getDayRange(null, new Date());
    var accounts = [];
    if(today.length){
      _.forEach(today[0], function(item,key){
        if(!_.contains(['debit', 'credit', 'balance', '_id', '_date'], key)){
          accounts.push(key);
        }
      });
    }
    return accounts;
  },

  isTypeSelected: function(){
    return String(this) === Session.get('activeAccount');
  }
});

Template.accounts.created = function(){
  Session.set('activeAccount', 'all-accounts');
}
