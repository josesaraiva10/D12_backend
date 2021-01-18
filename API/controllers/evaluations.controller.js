const app = require('../app.js');
const connect = require('../config/connection.js');

// read - seleciona todas as auditorias da tabela Audits
function read(req, res) {

    connect.con.query('SELECT * from Evaluations', function(err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send("Evaluations not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

// readById - seleciona uma auditoria com o audit_id dado da tabela Auditors
function readById(req, res) {
    const audit_id = req.params.audit_id;
    let mainQuery = 'SELECT * from Evaluations where evaluation_id = ?';
    
    connect.con.query(mainQuery, [audit_id], (err, rows) => {
        if(err) throw err;
        console.log('The evaluation you are looking for is: \n', rows)
        res.send(rows[0]);
    });
}



//    save - Insere uma auditoria na tabela Audits
//    Recebe os 5 parâmetros - audit_id // evaluation // description // audior_id // occurrence_id
function save(req, res) {

    const evaluation_id = req.sanitize('evaluation_id').escape();
    const ev_1 = req.sanitize('ev_1').escape();
    const ev_2 = req.sanitize('ev_1').escape();
    const ev_3 = req.sanitize('ev_1').escape();
    const ev_4 = req.sanitize('ev_1').escape();
    const ev_5 = req.sanitize('ev_1').escape();
    const ev_6 = req.sanitize('ev_1').escape();
    const ev_7 = req.sanitize('ev_1').escape();
    const ev_8 = req.sanitize('ev_1').escape();
    const ev_9 = req.sanitize('ev_1').escape();
    const ev_10 = req.sanitize('ev_1').escape();
    const ev_11 = req.sanitize('ev_1').escape();
    const ev_12 = req.sanitize('ev_1').escape();
    const ev_13 = req.sanitize('ev_1').escape();
    const ev_14 = req.sanitize('ev_1').escape();
    const ev_15 = req.sanitize('ev_1').escape();
    const ev_16 = req.sanitize('ev_1').escape();
    const ev_17 = req.sanitize('ev_1').escape();
    const ev_1 = req.sanitize('ev_1').escape();
    const ev_1 = req.sanitize('ev_1').escape();
    const ev_1 = req.sanitize('ev_1').escape();
    
    var query = "";
    var post = {
        audit_id: audit_id,
        evaluation: evaluation,
        description: description,
        fk_Audits_auditor_id: auditor_id,
        fk_Audits_occurrence_id: occurrence_id
    };
    
    query = connect.con.query('INSERT INTO Audits SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send(
                "Audit created with success!"
            );
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

//updade - atualiza os dados de uma auditoria na tabela Audits através de um audit_id, de forma segura

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const audit_id = req.params.audit_id;
    const evaluation = req.body.evaluation;
    const description = req.body.description;
    const grade = req.body.grade;
    const status = req.body.status;
    
    var query = "";
    
    var put = {
        evaluation,
        description,
        grade,
        status
    }
    
    query = connect.con.query('UPDATE Audits SET ? where audit_id = ?', [put, audit_id], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Audit updated with success!");
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

//deleteID - apaga todos os dados de uma auditoria da tabela Evaluations através de um evaluation_id

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const evaluation_id = req.params.evaluation_id;

    connect.con.query('DELETE from Evaluations where evaluation_id = ?', [evaluation_id], function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if(rows.length == 0) {
                res.status(404).send(
                    "Evaluation not found"
                );
            }
            else {
                res.status(200).send(
                    "Evaluation deleted with success!"
                );
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
    deleteID: deleteID,
};