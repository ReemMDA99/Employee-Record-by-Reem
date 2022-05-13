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
            //Add Bonus functionality
            "Update employee managers",
            "View employees by manager",
            "View employees by department",
            "Delete departments, roles, and employees",
            "View the total utilized budget of a department",
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
      case "Update Employee Manager":
        updateEmployeeManager();
        break;
      case "View Employees By Manager":
        viewEmployeesByManager();
        break;
      case "View Employees By Department":
        viewEmployeesByDepts();
        break;
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

addRole = () => {
  db.query(`SELECT * FROM department;`, (err, res) => {
      if (err) throw err;
      let departments = res.map(department => ({name: department.name, value: department.department_id}));
      inquirer.prompt([
          {
          name: 'title',
          type: 'input',
          message: 'What is the name of the role you want to add?'   
          },
          {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of the role you want to add?'   
          },
          {
          name: 'deptName',
          type: 'list',
          message: 'Which department do you want to add the new role to?',
          choices: departments
          },
      ]).then((response) => {
          db.query(`INSERT INTO role SET ?`, 
          {
              title: response.title,
              salary: response.salary,
             department_id: response.deptName
          },
          (err, res) => {
              if (err) throw err;
              console.table(response);
              console.log(`${response.title} iis now added to database!`);
              menu();
          })

      })
  })
};


//Add an employee to database

const addEmployee = () => {
  db.query('SELECT * FROM role', function (err, res){
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Please enter first name of the Employee',
      },
      {
        name: 'last_name',
        type: 'input',
        message:'Please enter last name of the Employee ',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Please choose Manager name of Employee ID ?',
        
      },
      {
        name: 'role',
        type: 'list',
        message: 'Please choose the Role of Employee?',
        choices: function() {
          let assignRole =[];
          for (let i= 0; i < res.length; i++) {
            assignRole.push(res[i].title);
          }
          return assignRole;
        },
      }
      
    ]).then(function (response){ 
      let role_id;
      for(let i=0; i < res.length; i++) {
        if (res[i].title == response.role) {
          role_id = res[i].id;
          console.log(role_id)
        }
      }
      db.query('INSERT INTO employee SET ?',
      {
        first_name: response.first_name,
        last_name: response.last_name,
        manager_id: response.manager_Id,
        role_id: role_id,
      },
      function(err) {
        if(err) throw err;
        console.log('Your employee has been added!');
        console.table(response);
        menu();
      })
    })
  })

};


//Update an employee role in database
const updateEmployeeRole = () => {
  db.query('SELECT * FROM employee', function (err, res){
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'selectEmployee',
        type: 'list',
        message: 'Please select the employee you wish to update:',
        choices: function() {
        let optionsArr = [];
        for (let i =0; i < res.length; i++) {
          optionsArr.push( i + 1 + res[i].first_name + "" + res[i].last_name);
        }
        return optionsArr;
      },
    }]) .then(function (res) {
      let selectedEmployee = parseInt(res.selectEmployee[0]);
      db.query('SELECT * FROM role', function(err, res) {
        if(err) throw err;
        inquirer.
            prompt (
          {
            name:'changeEmpRole',
            type: 'list',
            message: 'What role do you want to assign for this employee?',
            choices: function() {
              let updateRole = [];
              for (let i=0; i < res.length; i ++){
                updateRole.push(i+ 1 + "" + res[i].title);
              }
              return updateRole;
            },
        }).then(function (res) {
          console.log(selectedEmployee);
          let newEmpRoleId = parseInt(res.changeEmpRole[0]);
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


// View Employees By Department in database
const viewEmployeesByDepts = () => {
  db.query('SELECT * FROM employee', function (err, results){
    if(err) throw err;
    console.log('All Employees=' + results.length);
    console.table(results);
    menu();
    viewEmployeesByDepts();
  })
};

// QUIT the app
function quitApp() {
  db.end();
};


// // Update Employee Manager in database

// const updateEmployeeManager = () => {

// }
// // View Employees By Manager in database
// const viewEmployeesByManager = () => {

// }