const app = require('../app.js');
const connect = require('../config/connection.js');

// read - seleciona todos os auditores da tabela Auditors

function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Auditors', function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send("Auditors not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

// readById - seleciona um auditor com o auditor_id dado da tabela Auditors

function readById(req, res) {
    //criar e executar a query de leitura na BD
    const auditor_id = req.params.auditor_id;
    let mainQuery = 'SELECT * from Auditors where auditor_id = ?';
    
   connect.con.query(mainQuery, [auditor_id], (err, rows) => {
        if(err) throw err;
        console.log('The auditor you are looking for is: \n', rows);
        res.send(rows);
    });
}

/*  
    save - insere um auditor na tabela Auditors 
    Recebe os 6 parâmetros - auditor_id // name // birth_date // cc_auditor // phone_number // address
*/

function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const cc_auditor = req.sanitize('cc_auditor').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const address = req.sanitize('address').escape();
    const email = req.sanitize('email').escape();
    const user_id = req.sanitize('fk_Auditors_user_id').escape();
    
    var query = "";
    var post = {
        name: name,
        birth_date: birth_date,
        cc_auditor: cc_auditor,
        phone_number: phone_number,
        address: address,
        email: email,
        fk_Auditors_user_id: user_id
    };
    
    query = connect.con.query('INSERT INTO Auditors SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send(
                "Auditor created with success!"
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

// update - atualiza os dados de um auditor na tabela Auditors através de um auditor_id, de forma segura

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const auditor_id = req.params.auditor_id;
    const phone_number = req.body.phone_number;
    const address = req.body.address;
    const email = req.body.email;
    
    var query = "";
    
    var put = {
        phone_number,
        address,
        email
    }

    query = connect.con.query('UPDATE Auditors SET ? where auditor_id = ?', [put, auditor_id], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Auditor updated with success!");
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

// deleteID - apaga todos os dados de um auditor da tabela Auditors através de um auditor_id, de forma segura

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const auditor_id = req.params.auditor_id;
    
    connect.con.query('DELETE from Auditors where auditor_id = ?', [auditor_id], function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send(
                    "Auditor not found"
                );
            }
            else {
                res.status(200).send(
                    "Auditor deleted with success!"
                );
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function logicalDelete (req, res) {
    //receber os dados do formuário que são enviados por post
    const auditor_id = req.params.auditor_id;
    const status = req.body.status;
    
    var query = "";
    
    var put = {
        status
    }

    query = connect.con.query('UPDATE Auditors SET ? where auditor_id = ?', [put, auditor_id], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Auditor disabled with success!");
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

module.exports = {
    read: read,
    readById: readById,
    save: save,
    update: update,
    deleteID: deleteID,
    logicalDelete: logicalDelete
};