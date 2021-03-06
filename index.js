const inquirer = require('inquirer')
const cTable = require('console.table');
const connection = require('./db/database')

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
      console.log('view departments')
    } else if (answer.what === 'viewRoles') {
      console.log('view roles')
    } else if (answer.what === 'viewEmployees') {
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
      ])
      .then(answer => {
        // add employee info to the database
        console.log(answer)
      })
    }
  })  
}

afterConnection()