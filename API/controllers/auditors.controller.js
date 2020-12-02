const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Auditors', (err, rows) => {
        if(err) throw err;
        console.log('The data from auditors table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let auditorID = req.params.id;
    let mainQuery = 'SELECT * from Auditors where auditor_id = ?';
    connect.con.query(mainQuery, [auditorID], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the id is: \n', rows)
        res.send(rows);
    });
}

// Ao adicionar um auditor temos que adiconá-lo à tabela dos users?

function addRow(data) {
    let insertQuery = 'INSERT INTO Auditors (auditor_id, cc_auditor, name, birth_date, phone_number, address) VALUES ()';
    let query = mysql.format(insertQuery,["Auditors",]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

// Um auditor só pode mudar o seu nome, número de telemóvel e morada

function updateRow(data) {
    let updateQuery = "UPDATE Auditors SET name = 'e_joao' WHERE auditor_id = 1";
    let query = mysql.format(updateQuery,["Auditors","name",data.name,"auditor_id",data.auditor_id]);
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
    let selectQuery = 'SELECT name FROM Auditors WHERE auditor_id = 1';    
    let query = mysql.format(selectQuery,["Auditors","auditor_id", userName]);
    connect.con.query(query,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
}

function deleteRow(auditor) {
    let deleteQuery = "DELETE from Auditors WHERE auditor_id = '3'";
    let query = mysql.format(deleteQuery, ["Auditors", "auditor_id", auditor]);
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