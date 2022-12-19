const Department  = require("./lib/department");
const Employee = require("./lib/employee")
const Role = require("./lib/role")
const inquirer = require('inquirer');
const express = require ('express');
const mysql = require('mysql2');
const path = require ('path');


const PORT = process.env.PORT || 3001;
const app = express();


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
}


