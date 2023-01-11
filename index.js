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
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployee();
            break;
            case "VIEW_ALL_ROLES":
                viewAllRoles();
            break;
            case "ADD_ROLE":
                addRole();
            break;
            case "VIEW_ALL_DEPTS":
                viewAllDepartments();
            break;
            case "ADD_DEPT":
                addDepartment();
            break;
            default:
               process.exit() 
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

    db.promise().query( `SELECT department.id, department.name AS department 
    FROM department`).then((result) => {
        console.table(result[0]);   
         menu()
      }).catch( (err) => {
     throw err;
      });
    }

const viewAllRoles =()=>{
      
      db.promise().query( `SELECT role.id,role.title, role.salary, department.name AS department FROM role
      INNER JOIN department on role.department_id = department.id` ).then((result) => {
        console.log(result);
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
                console.table(result[0]); 
        }


        }
            catch(err) {
                console.error(err)
            }
     }
    
    const updateEmployee =()=> {
       
        const data =       `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
                    FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    db.promise().query(data).then((response,error) => {
      if (error){
        console.log(error)
        throw error;
      }
    
      let employeeNamesArray = [];
      response[0].forEach((employee) => {employeeNamesArray.push({name:`${employee.first_name} ${employee.last_name}`, value: employee.id});});

      const roleData = `SELECT role.id, role.title FROM role`;
      db.promise().query(roleData).then((response,error) => {
        if (error) throw error;
        let rolesArray = [];
        response[0].forEach((role) => {rolesArray.push({name:role.title, value:role.id});});
 inquirer.prompt([
    
                {
                    name:"emName",
                    message: "Which employee's role you want to update?",
                    type: "list",
                    choices: employeeNamesArray
                },
                {
                    name:"roleEm",
                    message: "Which role do you want to assign the selected employee?",
                    type: "list",
                    choices: rolesArray
                }
            ])
            .then((answer) => {
              let newTitleId, employeeId;
              newTitleId=answer.roleEm
              employeeId=answer.emName
  
      
              let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
             let result = db.query(
                sqls,
                [newTitleId, employeeId])
            console.table(result[0]);
            menu()
    
                })
            })
    });
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
            const insert = await db.promise().query(`INSERT INTO role ( title, salary) VALUES(?,?)`,[ response.roleName , response.roleSalary, response.roleDepartment,]);

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
                console.table(result[0]); 
        }


        }
            catch(err) {
                console.error(err)
            }
     }
    

    menu();