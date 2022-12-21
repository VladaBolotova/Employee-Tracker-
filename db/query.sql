USE  employee_db;
SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id;

USE  employee_db;
SELECT employee.id, employee.first_name, employee.last_name, role.title , role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id;