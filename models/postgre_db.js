var config = require('../config'),
  Db = require('pg');

module.exports = new Db(
  config.analysis_db.db, 
  new Server(config.analysis_db.host, config.analysis_db.port), 
  {safe: true}
);
