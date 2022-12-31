const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require("console.table"); 
const Employee = require('./lib/employee');

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
    /* 
    inquirer
mysql2
undici
*/
    
const viewAllEmployee = async () => {

    return await db.query( `SELECT * FROM employee`, function (err, result) {
            if(!err) throw err;     
            console.table(result);
            menu()
      });
    }

const viewAllDepartments =()=>{

    db.query( `SELECT * FROM department`, function (err, result) {
            if(!err) throw err;     
            console.table(result);
            menu()
      });
    }

    const viewAllRoles =()=>{
        if (choices.prompt === 'View All Roles')

      db.query( `SELECT * FROM role`, function (err, result) {
            if(!err) throw err;     
            console.table(result);
            menu()
      });
    }

const addEmployee = async () => {
    console.info('adding employee...', employee)
    try {
        const response = await inquirer.prompt(
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
        );

        if (!response) {
            console.error('error adding employee from prompts', responses);
            process.exitCode = 1;
            process.exit();
        }

        if (response) {
            console.log('add employee prompts', response)
            // const employee = new Employee(response?.first_name, response?.last_name, response?.role_id, response?.manager_id)
            const insert = await db.promise().query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES(?,?)`, ...response );

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
    
    const addRole =()=> {
        if(choices.prompt === 'Add A Role'){
            db.query(`SELECT * FROM`)
        }

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
        ]).then((res)=> {
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

    menu();