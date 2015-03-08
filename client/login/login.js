Template.login.events({
  'click #login': function(){
    var username = $('#username').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(username, password);
  }
});