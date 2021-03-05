INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager", 40000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Person", 40000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Developer", 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("CFO", 100000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 100000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Intern", 30000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Engineer", 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Meredith", "Palmer", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Halpert", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Erin", "Hannon", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", 3, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Toby", "Flenderson", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Howard", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kelly", "Kapoor", 4, 4);





