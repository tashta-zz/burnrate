Template.graph.events({

});

Template.graph.rendered = function(){
  var self = this;

  function showTransactions(d){
    // Find the matching data by date and account selection
    // Display in transaction template
    console.log(d);
  }

  Meteor.call('txs',null, null, 'struggling', function(err) {
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
    console.log(data);

    var graph_config = {
      bindto: "#"+self.data.graph_id,
      data: {
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
    return;
  });
};
