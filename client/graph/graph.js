Template.graph.rendered = function(){
  var self = this;

  function showTransactions(d){
    //d.x because x is the date object
    Session.set('transactionDate', d.x)
  }

  Meteor.call('txs',null, null, 'comfortable', function(err) {
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
        onclick: showTransactions,
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
