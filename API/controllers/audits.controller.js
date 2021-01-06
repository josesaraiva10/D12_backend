const app = require('../app.js');
const connect = require('../Config/connection.js');

// read - seleciona todas as auditorias da tabela Audits
function read(req, res) {

    connect.con.query('SELECT * from Audits', function(err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send("Audits not found");
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
    let mainQuery = 'SELECT * from Audits where audit_id = ?';
    
    connect.con.query(mainQuery, [audit_id], (err, rows) => {
        if(err) throw err;
        console.log('The audit you are looking for is: \n', rows)
        res.send(rows[0]);
    });
}

// readByStatus - seleciona uma auditoria com o status 1
function readByStatus(req, res) {
    const status = req.params.status;
    let mainQuery = 'SELECT * from Audits where status = 1';
    
    connect.con.query(mainQuery, [status], (err, rows) => {
        if(err) throw err;
        console.log('The audit you are looking for is: \n', rows)
        res.send(rows[0]);
    });
}

//    save - Insere uma auditoria na tabela Audits
//    Recebe os 5 parâmetros - audit_id // evaluation // description // audior_id // occurrence_id
function save(req, res) {

    const audit_id = req.sanitize('audit_id').escape();
    const evaluation = req.sanitize('evaluation').escape();
    const description = req.sanitize('description').escape();
    const auditor_id = req.sanitize('fk_Audits_auditor_id').escape();
    const occurrence_id = req.sanitize('fk_Audits_occurrence_id').escape();
    
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

//deleteID - apaga todos os dados de uma auditoria da tabela Audits através de um audit_id

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const audit_id = req.params.audit_id;

    connect.con.query('DELETE from Audits where audit_id = ?', [audit_id], function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if(rows.length == 0) {
                res.status(404).send(
                    "Audit not found"
                );
            }
            else {
                res.status(200).send(
                    "Audit deleted with success!"
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