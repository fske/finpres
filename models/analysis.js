var Future = require("fibers/future");
var pg = require('./postgresql_db.js');

function Analysis() {
};

//读取
Analysis.get = function(callback) {
  //打开数据库
  pg.connect();
  var query = pg.query("SELECT gold_price FROM price_precious_metal ORDER BY bid_time DESC LIMIT 200;");
  var results = [];
  var f = new Future();
  query.on('row', function(row, result) {
    console.info("row:" + row);
    result.addRow(row);
  });
  query.on('end', function(result) {
    results = result;
    console.info("result:" + result);
    f.return(true);
  });
  if (f.wait()) {
    console.info("results:" + results);
  }
};

module.exports = Analysis;
