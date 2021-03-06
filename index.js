const inquirer = require('inquirer')
const cTable = require('console.table');
const DB = require('./db/database')

afterConnection = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'what',
      message: 'What would you like to do?',
      choices: [
        {
          name: "View all departments",
          value: "viewDepartments"
        },
        {
          name: "View all roles",
          value: "viewRoles"
        },
        {
          name: "View all employees",
          value: "viewEmployees"
        },
        {
          name: "Add a department",
          value: "addDepartment"
        },
        {
          name: "Add a role",
          value: "addRole"
        },
        {
          name: "Add an employee",
          value: "addEmployee"
        },
        {
          name: "Update employee role",
          value: "updateEmployeeRole"
        }
      ]
    }
  ])
  .then(answer => {
    if (answer.what === 'viewDepartments') {
      // view department names & id's from database
      console.log('view departments')
    } else if (answer.what === 'viewRoles') {
      // view job titles, role id's, departments that role belongs to and salary from database
      console.log('view roles')
    } else if (answer.what === 'viewEmployees') {
      // view id's, firstnames, lastnames, job titles, departments, salaries, and manager they report to from database
      console.log('view employees')
    } else if (answer.what === 'addDepartment') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'newDepartment',
          message: 'what is the name of the department?'
        }
      ])
      .then(answer => {
        // add dept name to the database
        console.log(answer)
      })
    } else if (answer.what === 'addRole') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'newRole',
          message: 'what is the name of the role?'
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'what is the salary for the role?'
        }
      ])
      .then(answer => {
        // add role info to the database
        console.log(answer)
      })
    } else if (answer.what === 'addEmployee') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'employeeFirstName',
          message: 'Please enter employees first name.'
        },
        {
          type: 'input',
          name: 'employeeLastName',
          message: 'Please enter employees last name'
        }
        // another prompt to enter employee manager here
      ])
      .then(answer => {
        // add employee info to the database
        console.log(answer)
      })
    } else if (answer.what === 'updateEmployeeRole') {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'selectEmployee',
          message: 'Please select the employee',
          // employee data will be displayed here
          choices: ['employee 1', 'employee 2']
        },
        {
          type: 'list',
          name: 'employeeNewRole',
          message: 'What is your new employees role?',
          // roles from database will populate here
          choices: ['role 1', 'role 2']
        }
      ])
      .then(answer => {
        // update employee role in database
        console.log(answer)
      })
    }
  })  
}

afterConnection()