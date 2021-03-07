

class DB {
    // get departments
    get departments() {
      return "SELECT department.id, department.name FROM department"
    }
    // create a new role
    get createRole() {
      return "INSERT INTO role SET ?"
    }

}

module.exports = new DB()



