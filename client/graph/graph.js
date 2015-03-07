var tempdata = [
  {
    "balance": 1445,
    "credit": 2122,
    "debit": 2956,
    "_date": "2014-05-13"
  },
  {
    "_id": "54fb87167dc0f78fd902531b",
    "index": 1,
    "guid": "6786c0fd-6350-4bbf-b3c8-dca6f699b9fe",
    "balance": 590,
    "credit": 1821,
    "debit": 1888,
    "_date": "2014-11-21"
  },
  {
    "_id": "54fb87163818dad151284d05",
    "index": 2,
    "guid": "7716a78a-4525-46ca-9e8a-9c4481bfa287",
    "balance": 3120,
    "credit": 1952,
    "debit": 1133,
    "_date": "2014-03-08"
  },
  {
    "_id": "54fb87165c8faab8a4a70dd4",
    "index": 3,
    "guid": "a8cf6eb0-d433-4ace-89b5-f077b7bf9d7b",
    "balance": 3206,
    "credit": 2530,
    "debit": 1621,
    "_date": "2014-08-28"
  },
  {
    "_id": "54fb8716226178230aed7930",
    "index": 4,
    "guid": "498d21b4-ac91-4457-acbb-e9d3c7e6a336",
    "balance": 3638,
    "credit": 3129,
    "debit": 634,
    "_date": "2014-05-07"
  },
  {
    "_id": "54fb8716a6bb7cfbc1e2334c",
    "index": 5,
    "guid": "995173d0-d4bd-4b34-b6a7-6a4c1a3692f3",
    "balance": 1156,
    "credit": 564,
    "debit": 76,
    "_date": "2014-06-16"
  },
  {
    "_id": "54fb871618737e5e68fc95c8",
    "index": 6,
    "guid": "eebda105-76a5-42cf-b017-f4518de99c61",
    "balance": 2395,
    "credit": 2919,
    "debit": 2288,
    "_date": "2014-11-12"
  },
  {
    "_id": "54fb87165e0082d7b7336ba3",
    "index": 7,
    "guid": "d92a8932-1eed-4db8-a7f4-26b01439f6b0",
    "balance": 923,
    "credit": 1906,
    "debit": 2204,
    "_date": "2014-06-20"
  },
  {
    "_id": "54fb8716ed59f26b9bc57f97",
    "index": 8,
    "guid": "e4146fdb-292a-4253-bcbe-c76c8d9a08ce",
    "balance": 2338,
    "credit": 1278,
    "debit": 3324,
    "_date": "2014-03-12"
  },
  {
    "_id": "54fb871646404744ea09db0a",
    "index": 9,
    "guid": "e5598c38-18dc-41c3-bf54-58d118a8df42",
    "balance": 1757,
    "credit": 3523,
    "debit": 2880,
    "_date": "2014-03-08"
  },
  {
    "_id": "54fb8716da0820c27fe53279",
    "index": 10,
    "guid": "3638f352-f71e-47bf-8579-c9d3d1fd3536",
    "balance": 1020,
    "credit": 333,
    "debit": 3760,
    "_date": "2015-01-23"
  }
]

var cento_conversion = 0.00001;

Template.graph.events({

});

Template.graph.rendered = function(){

  function transform(oldData){
    var newData = [];
    newData.push(['date']);
    newData.push(['balance']);
    newData.push(['credit']);
    newData.push(['debit']);
    _.forEach(oldData, function(datum){
      newData[0].push(datum._date);
      newData[1].push(datum.balance);
      newData[2].push(datum.credit);
      newData[3].push(datum.debit);
    });
    return newData;
  }
  var chart = c3.generate({
    bindto: "#"+this.data.graph_id,
    data: {
      //Will be something like tempdata form
      x: 'date',
      xFormate: '%Y%m%d',
      columns: transform(tempdata)
    },
    axis:{
      x:{
        type:"timeseries"
      }
    }
  });
};
