const app = require('../app.js');
const connect = require('../Config/connection.js');

function read(req, res) {
    connect.con.query('SELECT * from Testimonials', (err, rows) => {
        if (err) throw err;
        console.log('The data from Testimonials table are: \n', rows)
        res.send(rows);
    });
}

function readById(req, res) {
    let testimonials_id = req.params.id;
    let mainQuery = 'SELECT * from Testimonials where testimonials_id = ?';
    connect.con.query(mainQuery, [testimonials_id], (err, rows) => {
        if (err) throw err;
        console.log('The testimonial with the the id is: \n', rows)
        res.send(rows);
    });
}

function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const auditor_id = req.sanitize('auditor_id').escape();
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const cc_auditor = req.sanitize('cc_auditor').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const address = req.sanitize('address').escape();
    const user_id = req.sanitize('fk_Auditors_user_id').escape();
    
    var query = "";
    var post = {
        auditor_id: auditor_id,
        name: name,
        birth_date: birth_date,
        cc_auditor: cc_auditor,
        phone_number: phone_number,
        address: address,
        fk_Auditors_user_id: user_id
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
    const auditor_id = req.sanitize('auditor_id').escape();
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const cc_auditor = req.sanitize('cc_auditor ').escape();
    const phone_number = req.sanitize('phone_number ').escape();
    const address = req.sanitize('address ').escape();
    console.log("without hahsh:" + req.body.pass);
    
    var query = "";                                                             
    var update = {
        auditor_id,
        name,
        birth_date,
        cc_auditor,
        phone_number,
        address
    };

    query = connect.con.query('INSERT INTO Auditors SET name = ?, birth_date = ?, cc_auditor = ?, phone_number = ?, address = ? where auditor_id = ?', update, function(err, rows, fields) {
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
    const auditor_id = req.sanitize('auditor_id').escape();
    const post = {
        auditor_id: auditor_id
    };

    connect.con.query('DELETE from Auditors where auditor_id = ?', post, function(err, rows, fields) {
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
readById: readById
};