const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Complainers', (err, rows) => {
        if(err) throw err;
        console.log('The data from Complainers table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let complainer_cc= req.params.id;
    let mainQuery = 'SELECT * from Complainers where complainer_cc = ?';
    connect.con.query(mainQuery, [complainer_cc], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the id is: \n', rows)
        res.send(rows);
    });
}

function save(req, res) {
    //receber os dados do formuário que são enviados por post

    const complainer_cc = req.sanitize('complainer_cc').escape();
    const email = req.sanitize('email').escape();
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const gender = req.sanitize('gender').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const address = req.sanitize('address').escape();
    const postal_code = req.sanitize('postal_code').escape();
    
    var query = "";

    var post = {
        complainer_cc: complainer_cc,
        email: email,
        name: name,
        birth_date: birth_date,
        gender: gender,
        phone_number: phone_number,
        address: address,
        postal_code: postal_code,
    };

    query = connect.con.query('INSERT INTO Complainers SET ?', post, function(err, rows, fields) {
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
// Um auditor só pode mudar o seu nome, número de telemóvel e morada
// update rows

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const name = req.sanitize('name').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const address = req.sanitize('address').escape();
    const complainer_cc = req.sanitize('complainer_cc').escape();
    console.log("without hahsh:" + req.body.pass);

    var query = "";
    var update = {
        name,
        phone_number,
        address,
        complainer_cc
         };
    query = connect.con.query('INSERT INTO Complainers SET name = ?, phone_number = ?, address = ?, where complainer_cc = ?', update, function(err, rows,
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


function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const complainer_cc = req.sanitize('complainer_cc').escape();
    const post = {
        complainer_cc: complainer_cc
    };
    connect.con.query('DELETE from Complainers where complainer_cc = ?', post, function(err, rows, fields) {
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