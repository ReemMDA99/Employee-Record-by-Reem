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
  console.log(`Successfully connected to the employeeTracker_db database.`)
);
// Create prompts for user to select options from menu
function Menu() {
  // =====
  // Menu
  // =====
  inquirer.
    prompt ({
      type: 'list',
      name:'menu',
      message:'Welcome to our EMPLOYEE database, Please select your preferred options from the given Menu:',
      choices:[
            "View all departments", 
            "View all roles", 
            "View all employees", 
            "Add a department",
            "Add a role", 
            "Add an employee",
            "Update an employee role",
            //Add Bonus functionality
            "Update employee managers",
            "View employees by manager",
            "View employees by department",
            "Delete departments, roles, and employees",
            "View the total utilized budget of a department",
            "Quit"
    ]
  })

  .then 
}