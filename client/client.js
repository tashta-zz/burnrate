Template.main.events({
  'click a.graph-date-scroll.left': function() { modifyGraphDate(-1) },
  'click a.graph-date-scroll.right': function() { modifyGraphDate(1) },
});
    
Template.main.helpers({
  isLoggingIn: function(){
    Meteor.loggingIn();
  }
})

function modifyGraphDate(diff) {
  var graphDate = Session.get('graphDate') || 0;
  graphDate += diff;
  Session.set('graphDate', graphDate);
}
