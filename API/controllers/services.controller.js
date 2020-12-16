const app = require('../app.js');
const connect = require('../Config/connection.js');



function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Services', function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}



function save(req, res) {
    //receber os dados do formuário que são enviados por post

    const type = req.sanitize('type').escape();
    const description = req.sanitize('description').escape();
    
    var query = "";

    var post = {
        description: description,
        type: type,
    };

    query = connect.con.query('INSERT INTO Users SET ?', post, function(err, rows, fields) {
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




module.exports = {
    read: read,
    save: save
};