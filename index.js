const inquirer = require('inquirer')
const cTable = require('console.table');
const DB = require('./db/database');

const mysql = require('mysql2');
 
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'singstar73',
  database: 'employees'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection()
});

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
        },
        {
          name: "Exit",
          value: "exit"
        },
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
        addDepartment(answer)
        afterConnection()
      })
    } else if (answer.what === 'addRole') {
      addRole();
    } else if (answer.what === 'addEmployee') {
      addEmployee();
    } else if (answer.what === 'updateEmployeeRole') {
      updateEmployeeRole();
    } else if (answer.what === 'exit') {
      connection.end()
    }
  })  
}

// view all depts
function viewDepartments() {
  connection.promise().query("SELECT * FROM department")
  .then( ([rows]) => {
    console.table(rows)
    afterConnection()
  })
}

// view all roles
function viewRoles() {
  connection.promise().query("SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id")
  .then( ([rows]) => {
    console.table(rows)
    afterConnection()
  })
}

// view all employees
function viewEmployees() {
  connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id")
  .then( ([rows]) => {
    console.table(rows)
    afterConnection()
  })
}

// add a department
function addDepartment(answer) {
  connection.promise().query(
    'INSERT INTO department SET ?',
    {
      name: answer.newDepartment
    },
    function(err, res) {
      if (err) throw err;
    }
  );
}

// add a role
function addRole() {
  connection.promise().query(DB.getDepartments)
  .then(([rows, fields]) => {
    const departmentChoices = rows.map(({ id, name }) => ({
      name: name,
      value: id
    }))

    inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'what is the name of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'what is the salary for the role?'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'What department is this role in?',
          choices: departmentChoices
        }
    ])
    .then((answer) => {
      connection.query(DB.createRole, answer)
      console.log('New role has been added.')
      this.afterConnection()
    })
    .catch(console.log)
  })
  .catch(console.log)
}

function addEmployee() {
  connection.promise().query(DB.getRoles)
  .then(([rows,fields]) => {
    const roleChoices = rows.map(({ id, title }) => ({
      name: title,
      value: id
    }))
    connection.promise().query(DB.getManagers)
    .then(([rows, fields]) => {
      const managerChoices = rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }))
      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Please enter employees first name.'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Please enter employees last name'
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Please choose employees role',
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Please choose employees manager',
          choices: managerChoices
        }
      ])
      .then((answer) => {
        connection.query(DB.createEmployee, answer)
        console.log('New employee has been added.')
        this.afterConnection()
      })
    })
    .catch(console.log)
  })
  .catch(console.log)
}

function updateEmployeeRole() {
  connection.promise().query(DB.getManagers)
  .then(([rows, fields]) => {
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }))
    connection.promise().query(DB.getRoles)
    .then(([rows, fields]) => {
      const roleChoices = rows.map(({ id, title }) => ({
        name: title,
        value: id
      }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Please select the employee you wish to update',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'What is your new employees role?',
          choices: roleChoices
        }
      ])
      .then((answer) => {
        connection.query(DB.updateRole, [answer.role_id, answer.id])
        console.log('Employees role has been updated')
        this.afterConnection()
      })
    })
    .catch(console.log)
  })
  .catch(console.log)
}