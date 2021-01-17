const app = require('../app.js');
const connect = require('../config/connection.js');

//lê a tabela dos queixosos
function read(req,res) {
    connect.con.query('SELECT * from Complainers', (err, rows) => {
        if(err) throw err;
        console.log('The data from Complainers table are: \n', rows)
        res.send(rows);
    });
}

function readById(req, res) {
    let complainer_cc = req.params.complainer_cc;
    let mainQuery = 'SELECT * from Complainers where complainer_cc = ?';
    connect.con.query(mainQuery, [complainer_cc], (err, rows) => {
        if (err) throw err;
        console.log('The complainer searched is: \n', rows)
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
    const fk_Complainers_user_id = req.sanitize('fk_Complainers_user_id').escape();
    
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
        fk_Complainers_user_id
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
    const complainer_cc = req.params.complainer_cc
    const email = req.body.email;
    const name = req.body.name;
    const birth_date = req.body.birth_date;
    const gender = req.body.gender;
    const phone_number = req.body.phone_number;
    const address = req.body.address;
    const postal_code = req.body.postal_code;
    const fk_Complainers_user_id = req.body.fk_Complainers_user_id;
    const status = req.body.status;
    
    var query = "";
    
    var put = {
        email,
        name,
        birth_date,
        gender,
        phone_number,
        address,
        postal_code,
        fk_Complainers_user_id,
        status
    }

    query = connect.con.query('UPDATE Complainers SET ? where complainer_cc = ?', [put,complainer_cc], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Complainer updated with success")
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}



function logicalDelete (req, res) {
    //receber os dados do formuário que são enviados por post
    const complainer_cc = req.params.complainer_cc;
    const status = req.body.status;
    
    var query = "";
    
    var put = {
        status
    }

    query = connect.con.query('UPDATE Complainers SET ? where complainer_cc = ?' , [put, complainer_cc] , function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Request disabled with success!");
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}










function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const complainer_cc = req.params.complainer_cc;
   
    connect.con.query('DELETE from Complainers where complainer_cc = ?', [complainer_cc], function(err, rows, fields) {
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
        logicalDelete: logicalDelete,
        deleteID: deleteID
    };