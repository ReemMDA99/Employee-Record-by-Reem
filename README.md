# Employee-Record-by-Reem

## Description

Employee Record is an Employee Tracker CLI application that uses mySQL to create a DBMS for employee and company details.

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

### Database Schema
![image](./assets/12-sql-homework-demo-01.png)

## Screenshots

## Walkthrough video

- A walkthrough video demonstrating the following functionality of my application:

- This video demonstrates the functionality of the employee tracker submitted and a link to the video  included in my README file.

- This video shows all of the technical acceptance criteria being met.

- This video demonstrates how a user would invoke the application from the command line.

- This video demonstrates a functional menu with the options outlined in the acceptance criteria.


## Submission urls

- The URL of the GitHub repository: https://github.com/ReemMDA99/Employee-Record-by-Reem

## Technologies used

- HTML	
- Javascript	
- Node.js
- npm
- Mysql2 package
- Inquirer package
- console.table package

## Installation
- Run npm install in console. 
- Run mysql in project directory and initialize db with tables by running source db/schema.sql and source db/seed.sql while in the mysql terminal.

## License

Licensed under the MIT 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)