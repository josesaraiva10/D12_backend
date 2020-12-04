const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req, res) {
    connect.con.query('SELECT * from Requests', (err, rows) => {
        if (err) throw err;
        console.log('The data from requests table are: \n', rows)
        res.send(rows);
    });
}

function readById(req, res) {
    let request_id = req.params.id;
    let mainQuery = 'SELECT * from Requests where user_id = ?';
    connect.con.query(mainQuery, [request_id], (err, rows) => {
        if (err) throw err;
        console.log('The request with the the id is: \n', rows)
        res.send(rows);
    });
}


function save(req, res) {
    //receber os dados do formuário que são enviados por post

    const date = req.sanitize('date').escape();
    const address = req.sanitize('address').escape();
    const description = req.sanitize('description').escape();
    const place = req.sanitize('place').escape();
    const urgency = req.sanitize('urgency').escape();
    const status = req.sanitize('status').escape();


    var query = "";

    var post = {
        date: date,
        address: address,
        description: description,
        place: place,
        urgency: urgency,
        status: status,
    };

    query = connect.con.query('INSERT INTO Requests SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
            else res.status(400).send({ "msg": err.code });
        }
    });
}


function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const address = req.sanitize('address').escape();
    const description = req.sanitize('description').escape();
    const place = req.sanitize('place').escape();
    const urgency = req.sanitize('urgency').escape();
    const status = req.sanitize('status').escape();
    const request_id = req.sanitize('request_id')
    console.log("without hahsh:" + req.body.pass);

    var query = "";
    var update = {
        address,
        description,
        place,
        urgency,
        status,
        request_id
    };
    query = connect.con.query('INSERT INTO Requests SET address = ?, description = ?, place = ?, urgency = ?, status = ?, where request_id = ?', update, function(err, rows,
        fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({ "msg": "update with success" });
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}


//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const request_id = req.sanitize('request_id').escape();
    const post = {
        request_id: request_id
    };
    connect.con.query('DELETE from Requests where request_id = ?', post, function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}


module.exports = {
        read: read,
        readById: readById,
        save: save,
        update: update,
        deleteID: deleteID
    };