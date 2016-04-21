var config = require('../config'),
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;

module.exports = new Db(
  config.user_db.db, 
  new Server(config.user_db.host, config.user_db.port), 
  {safe: true}
);
