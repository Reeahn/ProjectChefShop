// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'artwork_db'
});
 
// execute will internally call prepare and query
connection.execute(
  'SELECT * FROM `customer`',
  function(err, results, fields) {
    console.log(fields);
    console.log(results); // results contains rows returned by server
 
    // If you execute same statement again, it will be picked from a LRU cache
    // which will save query preparation time and give better performance
  }
);

connection.end();