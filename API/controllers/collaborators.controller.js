const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Collaborators', (err, rows) => {
        if(err) throw err;
        console.log('The data from Collaborators table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let collaborators_id = req.params.id;
    let mainQuery = 'SELECT * from Collaborators where ocurrence_id = ?';
    connect.con.query(mainQuery, [collaborators_id], (err, rows) => {
        if(err) throw err;
        console.log('The collaborator with the id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Collaborators (collaborators_id, name, birth_date, gender, nif, phone_number, adress, fk_collaborators_user_id)';
    let query = global.mysql.format(insertQuery,["collaborators", "collaborators_id", "name", "birth_date", "gender", "nif","phone_number", "adress", "fk_collaborators_user_id", data.collaborators_id,data.name,data.birth_date, data.gender, data.nif, data.phone_number, data.adress, data.fk_collaborators_user_id]);
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
    let updateQuery = "UPDATE Collaborators SET password = 'e_joao' WHERE collaborators_id = 1";
    let query = global.mysql.format(updateQuery,["Collaborators","password",data.password,"collaborators_id",data.collaborators_id]);
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
    let selectQuery = 'SELECT password FROM Collaborators WHERE collaborators_id = 1';    
    let query = global.mysql.format(selectQuery,["Collaborators","collaborators_id", userName]);
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
    let deleteQuery = "DELETE from Collaborators WHERE collaborators_id = '3'";
    let query = global.mysql.format(deleteQuery, ["Collaborators", "collaborators_id", userName]);
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