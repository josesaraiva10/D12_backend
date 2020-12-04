const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req, res) {
    connect.con.query('SELECT * from Auditors', (err, rows) => {
        if (err) throw err;
        console.log('The data from auditors table are: \n', rows)
        res.send(rows);
    });
}

function readById(req, res) {
    let auditorID = req.params.id;
    let mainQuery = 'SELECT * from Auditors where auditor_id = ?';
    connect.con.query(mainQuery, [auditorID], (err, rows) => {
        if (err) throw err;
        console.log('The user with the the id is: \n', rows)
        res.send(rows);
    });
}

//função de gravação que recebe os 6 parâmetros   auditor_id // name // birth_date // cc_auditor // phone_number // address
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const auditor_id = req.sanitize('auditor_id').escape();
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const cc_auditor = req.sanitize('cc_auditor').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const address = req.sanitize('address').escape();
    var query = "";
    var post = {
        name: name,
        birth_date: birth_date,
        cc_auditor: cc_auditor,
        phone_number: phone_number,
        address: address
    };
    query = connect.con.query('INSERT INTO auditors SET ?', post, function(err, rows, fields) {
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

//efetuar updade de todos os dados para um determinado auditor_id
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const auditor_id = req.sanitize('auditor_id').escape();
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const cc_auditor = req.sanitize('cc_auditor ').escape();
    const phone_number = req.sanitize('phone_number ').escape();
    const address = req.sanitize('address ').escape();
        const iduser = req.sanitize('id').escape(); console.log("without hahsh:" + req.body.pass);
        var query = "";
        var update = {
            auditor_id,
            name,
            birth_date,
            cc_auditor,
            phone_number,
            address
        }; query = connect.con.query('INSERT INTO auditors SET auditors_id = ?, name = ?, birth_date =?, cc_auditor = ?, phone_number = ?, address = ?, where auditors_id=?', update, function(err, rows,
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
    
    //função que apaga todos os dados de um auditor_id
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const auditor_id = req.sanitize('auditor_id').escape();
    const post = {
        auditor_id: auditor_id
    }; 
    connect.con.query('DELETE from auditors where auditor_id = ?', post, function(err, rows, fields) {
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
