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
function menu() {
  inquirer.
    prompt ([{
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
            // //Add Bonus functionality
            // "Update employee managers",
            // "View employees by manager",
            // "View employees by department",
            // "Delete departments, roles, and employees",
            // "View the total utilized budget of a department",
            "Quit"
    ]
  }])

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
      // case "Update Employee Manager":
      //   updateEmployeeManager();
      //   break;
      // case "View Employees By Manager":
      //   viewEmployeesByManager();
      //   break;
      // case "View Employees By Department":
      //   viewEmployeesByDepts();
      //   break;
      case 'QUIT':
        quitApp();
        break;
      default:
        break;
        
    }
  })
};
menu();

//View All Departments in database
const viewAllDepts = () => {
  db.query('SELECT * FROM department', function (err, results){
    if(err) throw err;
    console.log('All Departments=' + results.length);
    console.table(results);
    menu();
  })
};

//View All Roles in database
const viewAllRoles = () => {
  db.query('SELECT * FROM role', function (err, results){
    if(err) throw err;
    console.log('All Roles=' + results.length);
    console.table(results);
    menu();
  })
};

//View All Employees in database
const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', function (err, results){
    if(err) throw err;
    console.log('All Employees=' + results.length);
    console.table(results);
    menu();
  })
};

// Create an empty Array to assign role title for add employee function
let assignRoleArr = [];
function chooseRole() {
  db.query('SELECT * FROM role', function(err, results) {
    if(err) throw err;
    for(let i=0; i< results.length; i++) {
      assignRoleArr.push(results[i].title);
    }
  })
  return assignRoleArr;
}

// Create an empty Array to assign MANAGER title for add employee function
let assignManagerArr = [];
function chooseManager() {
  db.query('SELECT SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', function(err, results) {
    if(err) throw err;
    for(let i=0; i< results.length; i++) {
      assignManagerArr.push(results[i].name);
    }
  })
  return assignManagerArr;
}

//Add an employee to database

const addEmployee = () => {
  db.query('SELECT * FROM role', function (err, results){
    if(err) throw err;
    inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Please enter first name of the Employee'
      },
      {
        name: 'last_name',
        type: 'input',
        message:'Please enter last name of the Employee '
      },
      {
        name: 'role',
        type: 'list',
        message: 'Please choose the Role of Employee?',
        choices: chooseRole()
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Please choose Manager name of Employee ID ?',
        choices: chooseManager()
      }
    
    ]).then(function (answer){ 
      let role_id = chooseRole().indexOf(answer.role) + 1
      let manager_id = chooseManager().indexOf(answer.choices) + 1
      db.query('INSERT INTO employee SET ?',
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        manager_id: manager_id,
        role_id: role_id

      },
      function(err) {
        if(err) throw err
        console.table(answer);
        menu();
      })
    })
  })
};

//Add a department to database

const addDept = () => {
  inquirer.prompt([
    {
        name: "newDepartName",
        type: "input",
        message: "Please enter the name of the new department you wish to add:"
    }
])
    .then(function (result) {
      db.query('INSERT INTO department SET ?',{name: result.name},
      db.query('SELECT * FROM department', function(err, res){
        if(err) throw err;
        console.table(result);
        console.log('New department have been added successfully!');
        menu();
      })
      )
    })
};

//Add a role to database

const addRole = () => {
  db.query('SELECT * FROM department', function(err, result){
    if(err) throw err;
    inquirer.prompt([
      {
        name:'addNewRole',
        type: 'input',
        message:'Please add a new Role'
      },
      {
        name:'addSalary',
        type:'input',
        message:'What is the salary of this role?'
      },
      {
        name:'department',
        type:'list',
        message:'Please select which department this role belongs to:',
        choices: function() {
          let fromDept = [];
          for (let i= 0; i < result.length; i++) {
            fromDept.push(result[i].name);
          }
          return fromDept;
        },
      }
    ]).then(function(results) {
      let deptID;
      for(let i=0; i < res.length; i++){
        if (res[i].name == results.department) {
          deptID = res[i].id;

        }
      } db.query('INSERT INTO role(name, salary, department) VALUES (?,?)',
      [results.addNewRole, results.addSalary, results.deptID],
      function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log('New role have been added successfully');
        menu();
      })
    })
  })
};


//Update an employee role in database
const updateEmployeeRole = () => {
  db.query('SELECT * FROM employee:', function (err, results){
    if (err) throw err;
    inquirer.prompt({
      name: 'selectEmployee',
      type: 'list',
      message: 'Please select the employee you wish to update:',
      choices: function() {
        let optionsArr = [];
        for (let i =0; i < results.length; i++) {
          optionsArr.push( i + 1 + results[i].first_name + "" + results[i].last_name);
        }
        return optionsArr;
      },
    }) .then(function (results) {
      let selectedEmployee = parseInt(results.selectEmployee[0]);
      db.query('SELECT * FROM role;', function(err, results) {
        if(err) throw err;
        inquirer.prompt (
          {
            name:'changeEmpRole',
            type: 'list',
            message: 'What role do you want to assign for this employee?',
            choices: function() {
              let updateRole = [];
              for (let i=0; i < results.length; i ++){
                updateRole.push(i+ 1 + "" + results[i].title);
              }
              return updateRole;
            },
        }).then(function (results) {
          console.log(selectedEmployee);
          let newEmpRoleId = parseInt(results.changeEmpRole[0]);
          db.query('UPDATE employee SET role_id = ? WHERE id= ?;',
          [newEmpRoleId, selectedEmployee],
          function(err) {
            if (err) throw err;
            console.log("Update Employee's Role successfully!");
            viewAllEmployees();
          });
        })
      })
    })
  });
};
// // Update Employee Manager in database

// const updateEmployeeManager = () => {

// }
// // View Employees By Manager in database
// const viewEmployeesByManager = () => {

// }

// // View Employees By Department in database
// const viewEmployeesByDepts = () => {
//   db.query('SELECT employee.first_name, employee.last_name, department.name,', function (err, results){
//     if(err) throw err;
//     console.log('All Employees=' + results.length);
//     console.table(results);
//     menu();
//   })
// }
// QUIT the app
function quitApp() {
  db.end();
};
menu();
