const mysql = require("mysql2");
const util = require("util"); 
// Connect to database
const db = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    //  MySQL username,
    user: 'root',
    // MySQL password 
    password: 'Career@uoft2022',
    database: 'employeeTracker_db'
  });
  connection.connect();

  connection.query = util.promisify(connection.query); 

  module.exports = db;