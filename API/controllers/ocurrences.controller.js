
const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Ocurrences', (err, rows) => {
        if(err) throw err;
        console.log('The data from ocurrences table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let ocurrence_id = req.params.id;
    let mainQuery = 'SELECT * from Ocurrences where ocurrence_id = ?';
    connect.con.query(mainQuery, [ocurrence_id], (err, rows) => {
        if(err) throw err;
        console.log('The ocurrence with the id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Ocurrences (ocurrence_id, start_date, end_date, status, local, evaluation, access_code, fk_Occ_manager_id, fk_Occ_team_id) VALUES ("5", "works", "5")';
    let query = global.mysql.format(insertQuery,["Ocurrences","ocurrence_id","start_date","end_date","status", "local", "evaluation", "access_code", "fk_Occ_manager_id", "fk_Occ_team_id",data.ocurrence_id,data.start_date,data.end_date, data.status, data.local, data.evaluation, data.access_code, data.fk_Occ_manager_id, data.fk_Occ_team_id]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

// update rows

function updateRow(data) {
    let updateQuery = "UPDATE Ocurrences SET        !password =        !'e_joao' WHERE ocurrence_id =         !1";
    let query = global.mysql.format(updateQuery,["Ocurrences","        !password",data.password,"ocurrence_id",data.ocurrence_id]);
    // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
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
    let selectQuery = 'SELECT password FROM Users WHERE ocurrence_id =      !1';    
    let query = global.mysql.format(selectQuery,["Ocurrences","ocurrence_id",      !userName]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
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
    let deleteQuery = "DELETE from Ocurrences WHERE ocurrence_id =      !'3'";
    let query = global.mysql.format(deleteQuery, ["Ocurrences", "ocurrence_id",        !userName]);
    // query = DELETE from `todo` where `user`='shahid';
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

