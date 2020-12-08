const app = require('../app.js');
const connect = require('../Config/connection.js');

function read(req, res) {
    connect.con.query('SELECT * from Task_Force', (err, rows) => {
        if (err) throw err;
        console.log('The data from Task Force table are: \n', rows)
        res.send(rows);
    });
}

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