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
});

class DB {
    constructor(connection) {
        this.connection = connection
    }

    // create a new role
    createRole() {
      return this.connection.promise().query("INSERT INTO role SET ?")
    }

}

module.exports = new DB(connection)



