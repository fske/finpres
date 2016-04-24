var pg_conf = require("../config")["analysis_db"];
var Client = require('pg').Client;

console.log(pg_conf);

var client = new Client(pg_conf);

client.connect();

var query = client.query("SELECT count(1) AS num FROM price_precious_metal");
query.on('row', function(row) {
    console.log(row.num);
});
query.on('end', client.end.bind(client));
