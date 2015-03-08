Template.graph.events({

});

Template.graph.rendered = function(){
  var self = this;
  // To be replaced by Zach's function
  function showTransactions(d){
    // Find the matching data by date and account selection
    // Display in transaction template
    console.log(d,_.find( tempdata, function(datum){
      if(d.x == datum._date){
        return true;
      }
    }));
  }
  Meteor.call('txs',function(err) {
    if (!err) {
      var data = getDayRange()
      data = getGraphTransform(data);
      console.log(data);
      var graph_config = {
        bindto: "#"+self.data.graph_id,
        data: {
          //Will be something like tempdata form
          onmouseover: showTransactions,
          x: 'date',
          columns: data['all-accounts'],
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
    }
  });


};
