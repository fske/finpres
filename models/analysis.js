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
  var f = new Future();
  query.on('row', function(row) {
    console.info("row:" + row);
    result.push(row.gold_price);
  });
  f.return(true);
  if (f.wait()) {
    query.on('end', client.end.bind(client));
    console.info("result:" + result);
    callback("", result);
  }
};

module.exports = Analysis;
