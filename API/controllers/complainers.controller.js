
const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Complainers', (err, rows) => {
        if(err) throw err;
        console.log('The data from complainers table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let ComplainerCC = req.params.id;
    let mainQuery = 'SELECT * from Complainers where complainer_cc = ?';
    connect.con.query(mainQuery, [ComplainerCC], (err, rows) => {
        if(err) throw err;
        console.log('The user with the  id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Complainers (complainer_cc, name, birth_date, gender, email, address, postal_code, fk_Complainers_user_id) VALUES        !("5", "works", "5")';
    let query = mysql.format(insertQuery,["Complainers","complainer_cc","name","birth_date","gender","phone_number","email","address","postal_code","fk_Complainers_user_id",data.complainer_cc,data.name,data.birth_date,data.gender,data.email,data.address,data.postal_code,data.fk_Complainers_user_id]);
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
    let updateQuery = "UPDATE Complainers SET name =        !'e_joao' WHERE complainer_cc = 1";
    let query = mysql.format(updateQuery,["Complainers","name",data.name,"complainer_cc",data.complainer_cc]);
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
    let selectQuery = 'SELECT namw FROM Complainers WHERE complainer_cc = 1';    
    let query = mysql.format(selectQuery,["Complainers","complainer_cc", userName]);
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
    let deleteQuery = "DELETE from Complainers WHERE complainer_cc = '3'";
    let query = mysql.format(deleteQuery, ["Complainers", "complainer_cc", userName]);
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
const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Complainers', (err, rows) => {
        if(err) throw err;
        console.log('The data from complainers table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let ComplainerCC = req.params.id;
    let mainQuery = 'SELECT * from Complainers where complainer_cc = ?';
    connect.con.query(mainQuery, [ComplainerCC], (err, rows) => {
        if(err) throw err;
        console.log('The user with the  id is: \n', rows)
        res.send(rows);
    });
}


function addRow(data) {
    let insertQuery = 'INSERT INTO Complainers (complainer_cc, name, birth_date, gender, email, address, postal_code, fk_Complainers_user_id) VALUES        !("5", "works", "5")';
    let query = mysql.format(insertQuery,["Complainers","complainer_cc","name","birth_date","gender","phone_number","email","address","postal_code","fk_Complainers_user_id",data.complainer_cc,data.name,data.birth_date,data.gender,data.email,data.address,data.postal_code,data.fk_Complainers_user_id]);
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
    let updateQuery = "UPDATE Complainers SET name =        !'e_joao' WHERE complainer_cc = 1";
    let query = mysql.format(updateQuery,["Complainers","name",data.name,"complainer_cc",data.complainer_cc]);
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
    let selectQuery = 'SELECT namw FROM Complainers WHERE complainer_cc = 1';    
    let query = mysql.format(selectQuery,["Complainers","complainer_cc", userName]);
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
    let deleteQuery = "DELETE from Complainers WHERE complainer_cc = '3'";
    let query = mysql.format(deleteQuery, ["Complainers", "complainer_cc", userName]);
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