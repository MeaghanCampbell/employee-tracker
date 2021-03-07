const inquirer = require('inquirer')
const cTable = require('console.table');
const DB = require('./db/database');
const { connection } = require('./db/database');

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
      viewDepartments()
    } else if (answer.what === 'viewRoles') {
      viewRoles()
    } else if (answer.what === 'viewEmployees') {
      viewEmployees()
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

function viewDepartments() {
  connection.promise().query("SELECT * FROM department")
  .then( ([rows]) => {
    console.table(rows)
  })
}

function viewRoles() {
  connection.promise().query("SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id")
  .then( ([rows]) => {
    console.table(rows)
  })
}

function viewEmployees() {
  connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id")
  .then( ([rows]) => {
    console.table(rows)
  })
}


afterConnection()