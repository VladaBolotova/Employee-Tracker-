const app = require('express').Router()

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