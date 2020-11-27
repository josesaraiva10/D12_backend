const express = require("express");
const app = express();
const mysql = require('mysql');
const port = process.env.port || 8080;

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'HDP0tpHOen',
  password: 'NTsscTJj76',
  database: 'HDP0tpHOen'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

app.get("/users",(req,res) => {
    connection.query('SELECT * from Users', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows)
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log('Server is running at port '+port);
});

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'remotemysql.com',
    user     : 'HDP0tpHOen',
    password : 'NTsscTJj76',
    database : 'HDP0tpHOen',
    debug    :  false
});

// add rows in the table

function addRow(data) {
    let insertQuery = 'INSERT INTO Users (user_id, password, type) VALUES ("5", "works", "5")';
    let query = mysql.format(insertQuery,["Users","user_id","password","type",data.user_id,data.password,data.type]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

setTimeout(() => {
    // call the function
    addRow({
        "user_id": "5",
        "password": "works",
        "type": "5"
    });
},5000);

// update rows

function updateRow(data) {
    let updateQuery = "UPDATE Users SET password = 'e_joao' WHERE user_id = 1";
    let query = mysql.format(updateQuery,["Users","password",data.password,"user_id",data.user_id]);
    // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows);
    });
}

setTimeout(() => {
    // call the function
    updateRow({
        "password": "e_joao",
    });
},5000);

// query rows in the table

function queryRow(userName) {
    let selectQuery = 'SELECT password FROM Users WHERE user_id = 1';    
    let query = mysql.format(selectQuery,["Users","user_id", userName]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    pool.query(query,(err, data) => {
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
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });
}

setTimeout(() => {
    // call the function
    deleteRow({
        "user_id": "3",
    });
},5000);