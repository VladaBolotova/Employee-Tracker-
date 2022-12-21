const Department  = require("./lib/department");
const Employee = require("./lib/employee")
const Role = require("./lib/role")
const path = require ('path');

const inquirer = require('inquirer');
const express = require ('express');

//Import and require mysql2
const mysql = require('mysql2');
const { appendFile } = require("fs");


const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: "root",
        password: "root",
        database: "employee_db",
        port: "8889"
    }
)


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
        type:"list",
    }
).then(function({choices}){
    switch(choices){
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
    fetch("http://localhost:3001/api/employee").then(()=>{
        menu()
    }).catch(err =>{
        console.log(err);
    })
    
    
}

const addEmployee =()=> {
    inquirer.prompt([
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
            type: "list",
        },
        {
            name:"employeeManager",
            message: "Who is the employee's manager?",
            choices: ["John Doe", "Mike Chan", "Ashley Rodriguez"],
            type: "list",
        },
    ]).then((res)=> {
        const employee = new Employee(res.firstName, res.lastName, res.employee, res.employeeRole, 
            res.employeeManager);
            menu();
    })
};

const updateEmployee =()=>{
    fetch ("http://localhost:3001/api/employee/:id");
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
            type: "list",
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    menu();
  });

