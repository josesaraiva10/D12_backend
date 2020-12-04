const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Audits', (err, rows) => {
        if(err) throw err;
        console.log('The data from audits table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let userID = req.params.id;
    let mainQuery = 'SELECT * from Audits where user_id = ?';
    connect.con.query(mainQuery, [userID], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the id is: \n', rows)
        res.send(rows);
    });
}


//função de gravação que recebe os 3 parâmetros   audit_id // evaluation // description //
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const audit_id = req.sanitize('audit_id').escape();
    const evaluation = req.sanitize('evaluation').escape();
    const description = req.sanitize('description').escape();
    var query = "";
    var post = {
        audit_id: audit_id,
        evaluation: evaluation,
        description: description,
    };
    query = connect.con.query('INSERT INTO audits SET ?', post, function(err, rows, fields) {
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

//efetuar updade de todos os dados para um determinado audit_id
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const audit_id = req.sanitize('audit_id').escape();
    const evaluation = req.sanitize('evaluation').escape();
    const description = req.sanitize('description').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    var update = {
        audit_id,
        evaluation,
        description
    };
    query = connect.con.query('INSERT INTO audits SET audit_id = ?, evaluation =?, description=? where audit_id=?', update, function(err, rows,
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

//função que apaga todos os dados de um audit_id
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const audit_id = req.sanitize('audit_id').escape();
    const post = {
        audit_id: audit_id
    };
    connect.con.query('DELETE from audits where audit_id = ?', post, function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if(rows.length == 0) {
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
    save: save
};
