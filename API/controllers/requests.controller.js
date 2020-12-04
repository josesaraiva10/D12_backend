const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Requests', (err, rows) => {
        if(err) throw err;
        console.log('The data from requests table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let requestID = req.params.id;
    let mainQuery = 'SELECT * from Requests where user_id = ?';
    connect.con.query(mainQuery, [requestID], (err, rows) => {
        if(err) throw err;
        console.log('The request with the the id is: \n', rows)
        res.send(rows);
    });
}


function save(req, res) {
//receber os dados do formuário que são enviados por post
const requestID = req.sanitize('request_id').escape();
const date = req.sanitize('date').escape();
const address = req.sanitize('address').escape();
const description = req.sanitize('description').escape();
const place = req.sanitize('place').escape();
const urgency = req.sanitize('urgency').escape();
const status = req.sanitize('status').escape();


var query = "";

var post = {
requestID: requestID,
date: date,
address: address,
description: description,
place: place,
urgency: urgency,
status,
};

query = connect.con.query('INSERT INTO Requests SET ?', post, function (err, rows, fields) {
console.log(query.sql);
if (!err) {
res.status(200).location(rows.insertId).send({
"msg": "inserted with success"
});
console.log("Number of records inserted: " + rows.affectedRows);
} else {
if (err.code == "ER_DUP_ENTRY") {
res.status(409).send({"msg": err.code});
console.log('Error while performing Query.', err);
} else res.status(400).send({"msg": err.code});
}
});
}


