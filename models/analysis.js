var Future = require("fibers/future");
var pg = require('./postgresql_db.js');

function Analysis() {
};

//读取
Analysis.get = function(callback) {
  //打开数据库
  pg.connect();
  var query = pg.query("SELECT gold_price FROM price_precious_metal ORDER BY bid_time DESC LIMIT 200;");
  var result = [];
  var f = new Future;
  query.on.future();
  query.on('row', function(row) {
    result.push(row.gold_price);
  }).wait();
  query.on('end', client.end.bind(client));
  console.log(result);
  callback("", result);
};

module.exports = Analysis;
