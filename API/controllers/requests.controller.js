const app = require('../app.js');
const connect = require('../Config/connection.js');

//lê os dados contidos na tabela de pedidos
function read(req, res) {
    connect.con.query('SELECT * from Requests', (err, rows) => {
        if (err) throw err;
        console.log('The data from requests table are: \n', rows)
        res.send(rows);
    });
}

//lê a informação de um pedido por um id
function readById(req, res) {
    let request_id = req.params.id;
    let mainQuery = 'SELECT * from Requests where request_id = ?';
    connect.con.query(mainQuery, [request_id], (err, rows) => {
        if (err) throw err;
        console.log('The request with the the id is: \n', rows)
        res.send(rows);
    });
}


function save(req, res) {
    //receber os dados do formuário que são enviados por post

    const date = req.sanitize('date').escape();
    const address = req.sanitize('address').escape();
    const description = req.sanitize('description').escape();
    const place = req.sanitize('place').escape();
    const urgency = req.sanitize('urgency').escape();
    const locality = req.sanitize('locality').escape();
    const entity = req.sanitize('entity').escape();
    const status = req.sanitize('status').escape();
    const type = req.sanitize('type').escape();
    const anonymity = req.sanitize('anonymity').escape();
    const filed = req.sanitize('filed').escape();
    const fk_Requests_collaborator_id = req.sanitize('fk_Requests_collaborator_id').escape();
    const fk_Requests_complainer_cc = req.sanitize('fk_Requests_complainer_cc').escape();
    


    var query = "";

    var post = {
        date: date,
        address: address,
        description: description,
        place: place,
        urgency: urgency,
        locality: locality,
        entity: entity,
        status: status,
        type: type,
        anonymity: anonymity,
        filed: filed,
        fk_Requests_collaborator_id : fk_Requests_collaborator_id,
        fk_Requests_complainer_cc : fk_Requests_complainer_cc
        
    };

    query = connect.con.query('INSERT INTO Requests SET ?', post, function(err, rows, fields) {
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


function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const address2 = req.body.address;
    const description2 = req.body.description;
    const place2 = req.body.place;
    const urgency2 = req.body.urgency;
    const locality2 = req.body.locality;
    const entity2 = req.body.entity2;
    const status2 = req.body.status;
    const fk_Requests_collaborator_id2 = req.body.fk_Requests_collaborator_id; 
    const fk_Requests_complainer_cc2 = req.body.fk_Requests_complainer_cc;
    const request_id = req.params.request_id;
    console.log("without hahsh:" + req.body.pass);

    var query = "";
    var update = {
        address2,
        description2,
        place2,
        urgency2,
        locality2,
        entity2,
        status2,
        fk_Requests_collaborator_id2,
        fk_Requests_complainer_cc2,
        request_id
    };
    query = connect.con.query('UPDATE Requests SET address = '+address2+', description = '+description2+', place = '+place2+', urgency = '+urgency2+', locality = '+locality2+', entity = '+entity2+', status = '+status2+', fk_Requests_collaborator_id = '+fk_Requests_collaborator_id2+', fk_Requests_complainer_cc = '+fk_Requests_complainer_cc2+' , where request_id = '+ request_id, update, function(err, rows,
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


//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const request_id = req.params.request_id;
    const delete2 = {
        request_id: request_id
    };
    connect.con.query('DELETE from Requests where request_id = ?', delete2, function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
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