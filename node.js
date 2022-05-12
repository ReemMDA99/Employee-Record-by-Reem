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

  .then(function (response) {
    switch (response.menu) {
      case "View all departments": 
        viewAllDepts();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDept();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
      case "Update Employee Manager":
        updateEmployeeManager();
        break;
      case "View Employees By Manager":
        viewEmployeesByManager();
        break;
      case "View Employees By Department":
        viewEmployeesByDepts();
        break;

      default:
        db.end();
        return;
        
    }
  })
};

//View All Departments in database

const viewAllDepts = () => {
  db.query('SELECT * FROM department', function (err, results){
    if(err) throw err;
    console.table(results);
    menu();
  })
};

//View All Roles in database
const viewAllRoles = () => {

}

//View All Employees in database

const viewAllEmployees = () => {

}
//Add a department to database

const addDept = () => {

}
//Add a role to database

const addRole = () => {
  
}

//Add a employee to database

const addEmployee = () => {
  
}
//Update an employee role in database
const updateEmployeeRole = () => {

}
// Update Employee Manager in database

const updateEmployeeManager = () => {

}
// View Employees By Manager in database
const viewEmployeesByManager = () => {

}

// View Employees By Department in database
const viewEmployeesByDepts = () => {

}
