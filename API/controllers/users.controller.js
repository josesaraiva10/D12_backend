
const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Users', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let userID = req.params.id;
    let mainQuery = 'SELECT * from Users where user_id = ?';
    connect.con.query(mainQuery, [userID], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Users (user_id, password, type) VALUES ("5", "works", "5")';
    let query = mysql.format(insertQuery,["Users","user_id","password","type",data.user_id,data.password,data.type]);
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
    let updateQuery = "UPDATE Users SET password = 'e_joao' WHERE user_id = 1";
    let query = mysql.format(updateQuery,["Users","password",data.password,"user_id",data.user_id]);
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
    let selectQuery = 'SELECT password FROM Users WHERE user_id = 1';    
    let query = mysql.format(selectQuery,["Users","user_id", userName]);
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
    let deleteQuery = "DELETE from Users WHERE user_id = '3'";
    let query = mysql.format(deleteQuery, ["Users", "user_id", userName]);
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
readById :readById,
readByName: readByName,
};