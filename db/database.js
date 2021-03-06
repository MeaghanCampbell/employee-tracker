

class DB {
    // get departments
    get getDepartments() {
      return "SELECT department.id, department.name FROM department"
    }
    // create a new role
    get createRole() {
      return "INSERT INTO role SET ?"
    }

    get getRoles() {
      return "SELECT role.id, role.title FROM role"
    }

    get getManagers() {
      return "SELECT employee.id, employee.first_name, employee.last_name FROM employee"
    }

    get createEmployee() {
      return "INSERT INTO employee SET ?"
    }

    get updateRole() {
      // issue with this sql syntax
      return "UPDATE employee SET role_id = ? WHERE id = ?"
    }
}

module.exports = new DB()



