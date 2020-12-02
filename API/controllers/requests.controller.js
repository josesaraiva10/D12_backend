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

