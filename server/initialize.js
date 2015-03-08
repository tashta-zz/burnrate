var USER_1 = {levelType: null, firstName: 'Sophia', lastName: 'Smith', thumbnailUrl: 'f1.jpg'};
var USER_2 = {levelType: 'struggling', firstName: 'Noah', lastName: 'Johnson', thumbnailUrl: 'm1.jpg'};
var USER_3 = {levelType: 'comfortable', firstName: 'Mary', lastName: 'Williams', thumbnailUrl: 'f2.jpg'};

var DEFAULT_USERS = [USER_1, USER_2, USER_3];
var DEFAULT_PASSWORD = 'password';

var initializeUsers = function(){
  _.each(DEFAULT_USERS, function(userData){
    var user = {password: DEFAULT_PASSWORD};
    user.username =  (userData.firstName[0] + userData.lastName).toLowerCase();
    user.email = user.username + '@test.com';
    user.profile = userData;
    Accounts.createUser(user);
  });
};

var initialize = function(){
  if (Users.find().count() === 0){
    initializeUsers();
  }
};

Meteor.startup(initialize);
