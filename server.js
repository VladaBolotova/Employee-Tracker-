const Department  = require("./lib/department");
const Employee = require("./lib/employee")
const Role = require("./lib/role")
const path = require ('path');

const inquirer = require('inquirer');
const express = require ('express');

//Import and require mysql2
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: "root",
        passowrd: "root",
        database: "employee_db"
    }
)


function menu(){
inquirer.prompt(
    {
        name:"choices",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
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
            name:"lastName",
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software engineer", "Account manager", "Account", "Legal Team Lead", "Lawyer", ],
            type: "confirm",
        },
        {
            name:"employeeManager",
            message: "Who is the employee's manager?",
            choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal", "Singh", "Malia Brown", "Sara Lourd", "Tom Allen",],
            type: "confirm",
        }
    ])
};

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
};

const addDepartment =()=> {
    inquirer.prompt({
        name: "departmentName",
        message: "What is the name of the department?",
        type: "input",
    })
}


