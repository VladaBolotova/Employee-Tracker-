USE  employee_db;
SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id;