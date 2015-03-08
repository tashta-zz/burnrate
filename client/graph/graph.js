Template.graph.rendered = function(){
  var self = this;
  this.autorun(function(){
    // This is only set if it is a first logon - only acceptable for hackathon
    if (Session.get('loadingTxs')) {
      // TODO: Display loading bar/icon
      return;
    }
    var activeAccount = Session.get('activeAccount');
    var mockTransaction = Session.get('mockTransaction');

    function showTransactions(d){
      //d.x because x is the date object
      Session.set('transactionDate', d.x);
    }
   
    var data;

    if(self.data.graph_id == "past_graph"){
      data = getDayRange(null, new Date());
    }else{
      data = mockTransaction ?
        // Ask a what-if?
        mockDayRange([mockTransaction], new Date(), null) :
        getDayRange(new Date(), null);
    }

    data = getGraphTransform(data);
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
  });
};
