const app = require('../app.js');
const connect = require('../Config/connection.js');

// read - seleciona todos os auditores da tabela Auditors

function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Auditors', function(err, rows, fields) {
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

// readById - seleciona um auditor com o auditor_id dado da tabela Auditors

function readById(req, res) {
    //criar e executar a query de leitura na BD
    const auditor_id2 = req.params.auditor_id;
    let mainQuery = 'SELECT * from Auditors where auditor_id = ?';
    
   connect.con.query(mainQuery, [auditor_id2], (err, rows) => {
        if(err) throw err;
        console.log('The auditor with the the id is: \n', rows);
        res.send(rows[0]);
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
    const fk_Auditors_user_id = req.sanitize('fk_Auditors_user_id').escape();
    
    var query = "";
    var post = {
        name: name,
        birth_date: birth_date,
        cc_auditor: cc_auditor,
        phone_number: phone_number,
        address: address,
        fk_Auditors_user_id: fk_Auditors_user_id
    };
    
    query = connect.con.query('INSERT INTO Auditors SET ?', post, function(err, rows, fields) {
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

// update - atualiza os dados de um auditor na tabela Auditors através de um auditor_id

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const auditor_id2 = req.params.auditor_id;
    const name2 = req.body.name;
    const cc_auditor2 = req.body.cc_auditor;
    const phone_number2 = req.body.phone_number;
    const address2 = req.body.address;
    console.log("without hahsh:" + req.body.pass);
    
    var query = "";                                                             

    query = connect.con.query('UPDATE Auditors SET name = '+ name2+', cc_auditor = '+ cc_auditor2+', phone_number = '+phone_number2+', address = '+address2+' where auditor_id = '+auditor_id2, function(err, rows, fields) {
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

// deleteID - apaga todos os dados de um auditor da tabela Auditors através de um auditor_id

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const auditor_id2 = req.params.auditor_id;
    
    connect.con.query('DELETE from Auditors where auditor_id = '+auditor_id2, function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
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