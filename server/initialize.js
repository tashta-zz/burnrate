var USER_1 = {levelId: 1110570164, firstName: 'Sophia', lastName: 'Smith', thumbnailUrl: 'f1.jpg'};
var USER_2 = {levelId: 1110570166, firstName: 'Noah', lastName: 'Johnson', thumbnailUrl: 'm1.jpg'};
var USER_3 = {levelId: 1110568334, firstName: 'Mary', lastName: 'Williams', thumbnailUrl: 'f2.jpg'};

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