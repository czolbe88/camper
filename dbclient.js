var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.USER_DB_HOST, //this is the name of mysql container
  user: process.env.USER_DB_USERNAME,
  port: process.env.USER_DB_PORT,
  password: process.env.USER_DB_PASSWORD,
  database: 'userdb',
  insecureAuth: true
});

exports.connection = connection;