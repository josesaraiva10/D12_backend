const app = require('../app.js');
const connect = require('../Config/connection.js');


function read(req,res) {
    connect.con.query('SELECT * from Collaborators', (err, rows) => {
        if(err) throw err;
        console.log('The data from Collaborators table are: \n', rows);
        res.send(rows);
    });
}

function readById(req,res) {
    let collaborators_id = req.params.id;
    let mainQuery = 'SELECT * from Collaborators where collaborator_id = ?';
    connect.con.query(mainQuery, [collaborators_id], (err, rows) => {
        if(err) throw err;
        console.log('The collaborator with the id is: \n', rows);
        res.send(rows);
    });
}


//função de gravação que recebe os 7 parâmetros   collaborator_id // name // birth_date // gender // nif // phone_number // address
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const collaborator_id = req.body('manager_id').escape();
    const name = req.body('name').escape();
    const birth_date = req.body('birth_date').escape();
    const gender = req.body('gender').escape();
    const nif = req.body('nif').escape();
    const phone_number = req.body('phone_number').escape();
    const address = req.body('address').escape();
    var query = "";
    var post = {
        collaborator_id: collaborator_id,
        name: name,
        birth_date: birth_date,
        gender: gender,
        nif: nif,
        phone_number: phone_number,
        address: address,
    };
    query = connect.con.query('INSERT INTO collaborators SET ?', post, function(err, rows, fields) {
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

//efetuar updade de todos os dados para um determinado collaborator_id
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const collaborator_id = req.sanitize('manager_id').escape();
    const name = req.sanitize('name').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const gender = req.sanitize('gender').escape();
    const nif = req.sanitize('nif').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const address = req.sanitize('address').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    var update = {
        collaborator_id,
        name,
        birth_date,
        gender,
        nif,
        phone_number,
        address,
    };
    query = connect.con.query('INSERT INTO collaborators SET collaborator_id = ?, name =?, birth_date =?, gender=?, nif =?, phone_number =?, address =?, where collaborator_id=?', update, function(err, rows,
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


//função que apaga todos os dados de um collaborator_id
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const collaborator_id = req.sanitize('collaborator_id').escape();
    const post = {
        collaborator_id: collaborator_id,
    };
    connect.con.query('DELETE from collaborators where collaborator_id = ?', post, function(err, rows, fields) {
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
save: save,
update: update,
deleteID: deleteID,
};