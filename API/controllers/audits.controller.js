const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Audits', (err, rows) => {
        if(err) throw err;
        console.log('The data from audits table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let userID = req.params.id;
    let mainQuery = 'SELECT * from Audits where user_id = ?';
    connect.con.query(mainQuery, [userID], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Audits (audit_id, evaluation, description) VALUES ()';
    let query = mysql.format(insertQuery,["Audits"]);
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
    let updateQuery = "UPDATE Audits SET name = 'e_joao' WHERE audit_id = 1";
    let query = mysql.format(updateQuery,["Audits","name",data.name,"audit_id",data.audit_id]);
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

function deleteRow(userName) {
    let deleteQuery = "DELETE from Audits WHERE user_id = '3'";
    let query = mysql.format(deleteQuery, ["Audits", "audit_id", audit]);
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
readById :readById,
addRow: addRow,
updateRow: updateRow,
deleteRow: deleteRow
};