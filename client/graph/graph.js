var Points = new Meteor.Collection(null);

if(Points.find({}).count() === 0){
  for(i = 0; i < 20; i++)
    Points.insert({
      date:moment().startOf('day').subtract(Math.floor(Math.random() * 1000),'days').toDate(),
      value:Math.floor(Math.random() * 100)+500
    });
}

Template.graph.events({
  'click #add':function(){
    Points.insert({
      date:moment().startOf('day').subtract(Math.floor(Math.random() * 1000), 'days').toDate(),
      value:Math.floor(Math.random() * 100)+500
    });
  },
  'click #remove':function(){
    var toRemove = Random.choice(Points.find().fetch());
    Points.remove({_id:toRemove._id});
  },
  'click #randomize':function(){
    //loop through bars
    Points.find({}).forEach(function(point){
      Points.update({_id:point._id},{$set:{value:Math.floor(Math.random() * 100)+500}});
    });
  }
});

Template.graph.rendered = function(){
  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                  .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                  // .transitionDuration(350)  //how fast do you want the lines to transition?
                  .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                  .showYAxis(true)        //Show the y-axis
                  .showXAxis(true)        //Show the x-axis
    ;

    chart.xAxis     //Chart x-axis settings
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));

    chart.yAxis     //Chart y-axis settings
        .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));

    /* Done setting the chart up? Time to render it!*/
    var myData = sinAndCos();   //You need data...

    d3.select('#past_graph')    //Select the <svg> element you want to render the chart in.
        .datum(myData)         //Populate the <svg> element with chart data...
        .call(chart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function() { chart.update() });
    return chart;
  });
  /**************************************
   * Simple test data generator
   */
  function sinAndCos() {
    var sin = [],sin2 = [],
        cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});
      sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i/10)});
    }

    //Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      //values - represents the array of {x,y} data points
        key: 'Sine Wave', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }
};
