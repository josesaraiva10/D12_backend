const app = require('../app.js');
const connect = require('../Config/connection.js');

function read(req,res) {
    connect.con.query('SELECT * from Operations_Managers', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let userID = req.params.id;
    let mainQuery = 'SELECT * from Operations_Managers where manager_id = ?';
    connect.con.query(mainQuery, [userID], (err, rows) => {
        if(err) throw err;
        console.log('The operation manager with the the id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Operations_Managers (manager_id,birth_date,rating,phone_number,email,distance_from_scene,availability) VALUES ("", "", "","")';
    let query = global.mysql.format(insertQuery,["birth_date","rating","phone_number","email","distance_from_scene","availability"]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}



//
//
//POR ACABAR
// update rows

function updateRow(data) {
    let updateQuery = "UPDATE Operations_Managers SET password = 'e_joao' WHERE manager_id = 1";
    let query = global.mysql.format(updateQuery,["Users","password",data.password,"manager_id",data.manager_id]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows);
    });
}

// query rows in the table

function queryRow(userName) {
    let selectQuery = 'SELECT password FROM Operations_Managers WHERE manager_id = 1';    
    let query = global.mysql.format(selectQuery,["Users","manager_id", userName]);
    connect.con.query(query,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
}

function deleteRow(userName) {
    let deleteQuery = "DELETE from Operations_Managers WHERE manager_id = '3'";
    let query = global.mysql.format(deleteQuery, ["Users", "manager_id", userName]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });
}

module.exports = {
read: read,
readById: readById,
addRow: addRow,
updateRow: updateRow,
queryRow: queryRow, 
deleteRow: deleteRow
};