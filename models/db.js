var configs = require('../config'),
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;

module.exports = new Db(
  configs.db, 
  new Server(configs.host, configs.port), 
  {safe: true}
);
