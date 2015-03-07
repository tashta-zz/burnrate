/** An asynchronous class to aggregate level data */

var endpoint = 'https://api.levelmoney.com/api/v2/hackathon';
var headers = { 'Accept': 'application/json' };
var apiToken = 'HackathonApiToken';
var getReq = function() {
  return {
    headers: headers,
    data: {
      args: {
        uid: this.user.uuid,
        token: this.user.token,
        'api-token': apiToken,
      },
    },
  };
};
  
Level = function Level(email, password, cb, mock) {
  cb = cb || function() {/* noop */};
  this.user = {};

  if (email && password) { this.login(email, password, cb); }
  // Mocks do not have email/password
  else {
    if (mock === 'comfortable') {
      this.user.uuid = 1110570164;
      this.user.token = '119947F2D985C3788998543A3D3AD90C';
    } else if (mock === 'struggling') {
      this.user.uuid = 1110570166;
      this.user.token = '63C08C4AA6E3CB1A4B13C9C5299365C0'
    } else {
      this.user.uuid = 1110568334;
      this.user.token = '1CA902A8E5D74EDBB0701B8DA5A79DB6';
    }
    // Ensure the instance is instantiated before reporting success
    // FIXME: Do not delegate to login
    setTimeout(Meteor.bindEnvironment(cb));
  }
}

Level.prototype.login = function(email, password, cb) {
  HTTP.post([endpoint, 'login'].join('/'), {
    headers: headers,
    data: {
      email: email,
      password: password,
    },
  }, function(err, res) {
     if (err) { return cb(new Error('Login failed for ' + email)); }

     this.user.uuid = res.data.uid;
     this.user.token = res.data.token;
     cb();
  });
};

Level.prototype.get = function(startDate, endDate, cb) {
  if (!cb) {
    if (endDate) {
      cb = endDate;
      endDate = null;
    } else if (startDate) {
      cb = startDate;
      startDate = null;
    } else {
      throw new Error('Level.get requires a callback');
    }
  }
  if (!(this.user.uuid && this.user.token)) { cb(new Error('Level not logged in')); }
  
  // Default range EPOCH-+1YEAR
  if (!endDate) {
   endDate = new Date();
   endDate.setYear(endDate.getFullYear());
  }

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // Level is 1-based
  var endYear = endDate.getFullYear();
  var endMonth = endDate.getMonth() + 1;
  var erred = false;
  var calls = 0;
  var data = {};
 
  // Get all accounts
  HTTP.post([endpoint, 'get-accounts'].join('/'), 
    getReq.call(this),
    aggregate.bind(null, 'accounts', 'accounts')
  ), calls++;
  // Get all real txs
  HTTP.post([endpoint, 'get-all-transactions'].join('/'),
    getReq.call(this),
    aggregate.bind(null, 'transactions', 'txs')
  ), calls++;

  // Get all predicted txs between now and endDate
  while (year <= endYear && month <= endMonth) {
    var req = getReq.call(this);
    req.data.year = year;
    req.data.month = month;

    HTTP.post([endpoint, 'projected-transactions-for-month'].join('/'),
      req,
      aggregate.bind(null, 'transactions', '+txs')
    ), calls++;

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  function aggregate(prop, name, err, res) {
    if (erred) { return; }
    if (err || res.data.error !== 'no-error') {
      erred = true;
      return cb(err || res.data.error);
    }

    if (!data[name]) { data[name] = res.data[prop]; }
    // Add txs to existing data
    else { [].push.apply(data[name], res.data[prop]); }

    // Process the data when it is ready
    if (!--calls) { cb(null, data); }
  }
};
