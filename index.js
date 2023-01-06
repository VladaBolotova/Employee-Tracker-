const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require("console.table"); 


function menu(){
    inquirer.prompt(
        {
            name:"choices",
            message: "What would you like to do?",
            type:"list",
            choices: [
            {   
                name: "View All Employees",
                value: 'VIEW_ALL_EMPLOYEES'
            },
            {
                name:  "Add An Employee",
                value: 'ADD_EMPLOYEE'
            },
            {   name: "Update Employee Role",
                value: 'UPDATE_EMPLOYEE_ROLE'
            },
            {
                name:  "View All Roles",
                value: 'VIEW_ALL_ROLES'
            },
            {
                name:  "Add A Role",
                value: 'ADD_ROLE'
            },
            {
                name:  "Add Department",
                value: 'ADD_DEPT'
            },
            {
                name: 'View All Departments',
                value: 'VIEW_ALL_DEPTS'
            },
            {
                name: 'exit',
                value: 'EXIT_CLI'
            }
        ]
    }
    ).then(({ choices }) => {
        console.log(choices)
        switch(choices) {
            case "VIEW_ALL_EMPLOYEES":
                viewAllEmployee();
            break;
            case "ADD_EMPLOYEE":
                addEmployee();
            break;
            case "Update Employee Role":
                updateEmployee();
            break;
            case "View All Roles":
                viewAllRoles();
            break;
            case "Add A Role":
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
 
    
const viewAllEmployee = () => {

     db.promise().query( `SELECT employee.id, employee.first_name, employee.last_name, role.title , role.salary, department.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
     FROM employee 
     LEFT JOIN role ON employee.role_id = role.id 
     JOIN department ON role.department_id = department.id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id;` ).then((result) => {
       console.table(result[0]);   
        menu()
     }).catch( (err) => {
    throw err;
     });
    }

const viewAllDepartments = () =>{

    db.promise().query( `SELECT department.id, deprtment.name 
    FROM department`).then((result) => {
        console.table(result[0]);   
         menu()
      }).catch( (err) => {
     throw err;
      });
    }

const viewAllRoles =()=>{
      
      db.promise().query( `SELECT * FROM role` ). then((result) => {
        console.table(result[0]);   
         menu()
      }).catch( (err) => {
     throw err;
      });
     }

const addEmployee = async () => {
    try {
        const response = await inquirer.prompt([
            {
                name: "firstName",
                message: "What is the first name?",
                type: "input",
            },
            {
                name: "lastName",
                message: "What is the last name?",
                type: "input",
            },
            {
                name: "managerId",
                message: "What is the manager id?",
                type: "input",
            },
            {
                name: "roleId",
                message: "What is the role id?",
                type: "input",
            }
        ]);
        if (!response) {
            console.error('error adding employee from prompts', response);
            process.exitCode = 1;
            process.exit();
        }

        if (response) {
            console.log('add employee prompts', response)
            const insert = await db.promise().query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,[ response.firstName , response.lastName, response.roleId, response.managerId]);

            console.log(insert);

            if(!insert) {
                console.error('error adding employee', insert);
                process.exitCode = 1
                process.exit()
            }
    
                if(insert) menu();
                console.table(result); 
        }


        }
            catch(err) {
                console.error(err)
            }
     }
    
    const updateEmployee =()=>{
       
    }
    
    const addRole = async () => {
        try {
     
        const response = await inquirer.prompt([
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
        ]);
        if (!response) {
            console.error('error adding role from prompts', response);
            process.exitCode = 1;
            process.exit();
        }

        if (response) {
            console.log('add role prompts', response)
            const insert = await db.promise().query(`INSERT INTO role ( title, salary, department_id) VALUES(?,?,?)`,[ response.roleName , response.roleSalary, response.roleDepartment,]);

            console.log(insert);

            if(!insert) {
                console.error('error adding role', insert);
                process.exitCode = 1
                process.exit()
            }
    
                if(insert) menu();
                console.table(result); 
        }


        }
            catch(err) {
                console.error(err)
            }
     }
    
 
    
    const addDepartment = async () => {
        try{
        const response = await inquirer.prompt({
            name: "departmentName",
            message: "What is the name of the department?",
            type: "input",
        });
        if (!response) {
            console.error('error adding department from prompts', response);
            process.exitCode = 1;
            process.exit();
        }

        if (response) {
            console.log('add department prompts', response)
            const insert = await db.promise().query(`INSERT INTO department ( name) VALUES(?)`,[ response.departmentName]);

            console.log(insert);

            if(!insert) {
                console.error('error adding department', insert);
                process.exitCode = 1
                process.exit()
            }
    
                if(insert) menu();
                console.table(result); 
        }


        }
            catch(err) {
                console.error(err)
            }
     }
    

    menu();