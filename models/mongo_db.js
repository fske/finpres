var config = require('../config')["user_db"],
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;

module.exports = new Db(
  config.db, 
  new Server(config.host, config.port), 
  {safe: true}
);
