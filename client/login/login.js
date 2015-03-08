Template.login.events({
  'click #login': function(){
    var username = $('#username').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(username, password, function(err) {
      if (err) { throw Error('Burnrate login failed'); }
      // Display loading
      Session.set('loadingTxs', true);

      Meteor.call('txs', null, null, Meteor.user().profile.levelType, function(err) {
        if (err) { throw Error('Level login failed'); }

        // Display loaded graphData
        Session.set('loadingTxs', false);
      });
    });
  }
});
