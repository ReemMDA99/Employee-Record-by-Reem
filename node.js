//Add dependencies
//Add inquirer package to interact with the user via the command line
const inquirer = require('inquirer');
const mysql = require('mysql2');
// Add  console.table package to print MySQL rows to the console.
//npm i console.table
const cTable = require('console.table');

// create the connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Career@uoft2022',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

