const app = require('../app.js');
const connect = require('../config/connection.js');

// read - seleciona todas as Evaluations da tabela Evaluations
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

// readById - seleciona uma Evaluation com o evaluation_id dado da tabela Evaluations
function readById(req, res) {
    const evaluation_id = req.params.evaluation_id;
    let mainQuery = 'SELECT * from Evaluations where evaluation_id = ?';
    
    connect.con.query(mainQuery, [evaluation_id], (err, rows) => {
        if(err) throw err;
        console.log('The evaluation you are looking for is: \n', rows)
        res.send(rows[0]);
    });
}


function sumGrade(req, res) {
    const evaluation_id = req.params.evaluation_id;
    const ev_1 = req.params.ev_1;
    const ev_2 = req.params.ev_2;
    const ev_3 = req.params.ev_3;
    const ev_4 = req.params.ev_4;
    const ev_5 = req.params.ev_5;
    const grade = req.params.grade;
    
    let mainQuery = 'SELECT (? + ? + ? + ? + ?) AS ? FROM Evaluations where evaluation_id = ?';
    
    connect.con.query(mainQuery, [ev_1, ev_2, ev_3, ev_4, ev_5, grade, evaluation_id], (err, rows) => {
        if(err) throw err;
        console.log('The evaluation you are looking for is: \n', rows)
        res.send(rows[0]);
    });
}

//    save - Insere uma avaliação na tabela Evaluations
//    Recebe os 7 parâmetros - evaluation_id // ev_1 // ev_2 // ev_3 // ev_4 // ev_5 // grade
function save(req, res) {

    const evaluation_id = req.sanitize('evaluation_id').escape();
    const ev_1 = req.sanitize('ev_1').escape();
    const ev_2 = req.sanitize('ev_2').escape();
    const ev_3 = req.sanitize('ev_3').escape();
    const ev_4 = req.sanitize('ev_4').escape();
    const ev_5 = req.sanitize('ev_5').escape();
    const grade = req.sanitize('grade').escape();
    const audit_id = req.sanitize('fk_Evaluations_audit_id').escape();
    
    var query = "";
    var post = {
        evaluation_id: evaluation_id,
        ev_1: ev_1,
        ev_2: ev_2,
        ev_3: ev_3,
        ev_4: ev_4,
        ev_5: ev_5,
        grade: grade,
        fk_Evaluations_audit_id: audit_id
    }
    
    query = connect.con.query('INSERT INTO Evaluations SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send(
                "Evaluation created with success!"
            );
        }
        else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg":  err.code });
                console.log('Error while performing Query.', err);
            }
            else res.status(400).send({ "msg": err.code });
        }
    });
}

//updade - atualiza os dados de uma avaliação na tabela Evaluations através de um evaluation_id, de forma segura

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const evaluation_id = req.params.evaluation_id;
    const ev_1 = req.body.ev_1;
    const ev_2 = req.body.ev_2;
    const ev_3 = req.body.ev_3;
    const ev_4 = req.body.ev_4;
    const ev_5 = req.body.ev_5;
    const grade = req.body.grade;
    
    var query = "";
    
    var put = {
        ev_1,
        ev_2,
        ev_3,
        ev_4,
        ev_5,
        grade
    }
    
    query = connect.con.query('UPDATE Evaluations SET ? where evaluation_id = ?', [put, evaluation_id], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Evaluation updated with success!");
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
    sumGrade: sumGrade,
    save: save,
    update: update,
    deleteID: deleteID,
};