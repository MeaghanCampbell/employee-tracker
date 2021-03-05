DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) UNIQUE NOT NULL,
   salary VARCHAR(7) NOT NULL,
   department_id INT NOT NULL,
   FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (role_id) REFERENCES role(id),
   FOREIGN KEY (manager_id) REFERENCES role(id)

);


