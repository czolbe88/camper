var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'password',
  database: 'userdb',
});

exports.connection = connection;

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The result is: ', results);
// });

// connection.end();