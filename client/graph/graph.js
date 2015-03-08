Template.graph.rendered = function(){
  var self = this;
  this.autorun(function(){
    var activeAccount = Session.get('activeAccount');

    function showTransactions(d){
      //d.x because x is the date object
      Session.set('transactionDate', d.x);
    }
    // Hard coded in a mock account here
    // Should replace with username and password ideally
    console.log(Meteor.user().profile.levelType);
    // FIXME: The reason loading takes so long is because this is called every time;
    // It only needs to be called when the user is changed
    Meteor.call('txs',null, null, Meteor.user().profile.levelType, function(err) {
      if(err){
        console.log(err);
        return;
      }

      var data;

      if(self.data.graph_id == "past_graph"){
        data = getDayRange(null, new Date());
      }else{
        data = getDayRange(new Date(), null);
      }

      data = getGraphTransform(data);
      // console.log("active account data", data[activeAccount]);
      var graph_config = {
        bindto: "#"+self.data.graph_id,
        data: {
          onclick: showTransactions,
          x: 'date',
          xFormat: '%m%d%Y',
          columns: data[activeAccount],
          types:{
            'credit':'area',
            'debit':'area',
            'balance': 'line'
          },
          colors:{
            'credit':'#00FF00',
            'debit':'#FF0000',
            'balance': '#0000FF'
          }
        },
        axis:{
          x:{
            type:"timeseries"
          }
        },
      };
      var chart = c3.generate(graph_config);
      return;
    });
  });
};
