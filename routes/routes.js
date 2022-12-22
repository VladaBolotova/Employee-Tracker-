const app = require('express').Router()
const table = require('console.table');

//route to view all employee
app.get('/api/employee', (req, res)=>{
    const sql = `SELECT id, first_name, last_name, title, department_id, role_id, manager_id AS title FROM employee`;
console.log('test');
    db.query(sql,(err, rows)=>{
        if(err){
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
      if(rows.length){
        console.table(rows);
      }else{
        console.log("no employees");
      }
    });
});


//route to view all roles
app.get('/api/role', (req, res)=>{
    const sql = `SELECT id, title, department_id, salary AS title FROM role`;

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


//route to view all department
app.get('/api/department', (req, res)=>{
    const sql = `SELECT id, name AS title FROM department`;

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

//route to update an employee
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

module.exports = app;