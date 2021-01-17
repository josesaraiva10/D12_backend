const app = require('../app.js');
const connect = require('../config/connection.js');

//lê as tabelas das equipas
function read(req, res) {
    connect.con.query('SELECT * from Task_Force', (err, rows) => {
        if (err) throw err;
        console.log('The data from Task Force table are: \n', rows)
        res.send(rows);
    });
}

//lê os dados da equipa por um id
function readById(req, res) {
    let task_force_id = req.params.id;
    let mainQuery = 'SELECT * from Task_Force where user_id = ?';
    connect.con.query(mainQuery, [task_force_id], (err, rows) => {
        if (err) throw err;
        console.log('The Task Force with the the id is: \n', rows)
        res.send(rows);
    });
}

module.exports = {
read: read,
readById: readById
};