const Department  = require("./lib/department");
const Employee = require("./lib/employee")
const Role = require("./lib/role")
const path = require ('path');

const inquirer = require('inquirer');
const express = require ('express');

//Import and require mysql2
const mysql = require('mysql2');
const { appendFile } = require("fs");


// const PORT = process.env.PORT || 3001;
// const app = express();

// //Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: "root",
//         passowrd: "root",
//         database: "employee_db"
//     }
// )


function menu(){
inquirer.prompt(
    {
        name:"choices",
        message: "What would you like to do?",
        choices: ["View All Employees",
        "Add Employee",
        "Update Employee Role", 
        "View All Roles", "Add Role",
        "View All Departments",
        "Add Department"],
        type:"confirm",
    }
).then(function(){
    switch(choice){
        case "View All Employees":
            viewAllEmployee();
        break;
        case "Add Employee":
            addEmployee();
        break;
        case "Update Employee Role":
            updateEmployee();
        break;
        case "View All Roles":
            viewallRoles();
        break;
        case "Add Role":
            addRole();
        break;
        case "View All Departments":
            viewAllDepartments();
        break;
        case "Add Department":
            addDepartment();
        break;
        default:
        console.log("No value found");
    }
})
};

const viewAllEmployee =()=>{
    app.get('/api/employee', (req, res)=>{
        const sql = `SELECT id, first_name, last_name, department_id, role_id, manager_id AS title FROM employee`;

        db.query(sql,(err, rows)=>{
            if(err){
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });
}

const addEmployee =()=> {
    inquirer.promp([
        {
            name:"firstName",
            message: "What is the employee's first name?",
            type: "input",
        },
        {
            name:"lastName",
            message: "What is the employee's last name?",
            type: "input",
        },
        {
            name:"employeeRole",
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software engineer", "Account manager", "Account", "Legal Team Lead", "Lawyer"],
            type: "confirm",
        },
        {
            name:"employeeManager",
            message: "Who is the employee's manager?",
            choices: ["John Doe", "Mike Chan", "Ashley Rodriguez"],
            type: "confirm",
        },
    ]).then((res)=> {
        const employee = new Employee(res.firstName, res.lastName, res.employee, res.employeeRole, 
            res.employeeManager);
            menu();
    })
};

const updateEmployee =()=>{
    app.put('api/employee/:id', (req, res) => {
        const sql = `UPDATE employee SET role = ? WHERE id = ? `;
        const params = [req.body.role_id, re.params.id];

        db.query(sql, params, (err, result) =>{
            if (err){
                res.status(400).json({ error: err.message});
            }else if (!result.affectedRows) {
                res.json({
                    message: "Employee not found"
                });
            }else {
                res.json({
                    message: "Success",
                    data: req.body,
                    changes: result.affectedRows
                });
            }
        });
    });
}

const addRole =()=> {
    inquirer.prompt([
        {
            name:"roleName",
            message: "What is the name of the role?",
            type: "input",
        },
        {
            name:"roleSalary",
            message: "What is the salary of the role?",
            type: "input",
        },
        {
            name:"roleDepartment",
            message: "Which department does the role belong to?",
            choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
            type: "confirm",
        }
    ])
    then((res)=> {
        const role = new Role (res.roleName, res.roleSalary, res.roleDepartment);
            menu();
    })
};

const addDepartment =()=> {
    inquirer.prompt({
        name: "departmentName",
        message: "What is the name of the department?",
        type: "input",
    }).then((res)=>{
        const department = new Department(res.departmentName);
        menu();
    })
}

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });

