const app = require('../app.js');
const connect = require('../Config/connection.js');

//lê o conteúdo da tabela dos gestores de operações
function read(req,res) {
    connect.con.query('SELECT * from Operation_Managers', (err, rows) => {
        if(err) throw err;
        console.log('The data from Operation Managers table are: \n', rows);
        res.send(rows);
    });
}

//lê o conteúdo do gestor de operações por um id
function readById(req,res) {
    let manager_id = req.params.id;
    let mainQuery = 'SELECT * from Operation_Managers where manager_id = ?';
    connect.con.query(mainQuery, [manager_id], (err, rows) => {
        if(err) throw err;
        console.log('The operation manager with the the id is: \n', rows);
        res.send(rows);
    });
}


//função de gravação que recebe os 7 parâmetros   manager_id // birth_date // rating // phone_number // email // distance_from_scene // availability
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const birth_date = req.sanitize('birth_date').escape();
    const rating = req.sanitize('rating').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const email = req.sanitize('email').escape();
    const distance_from_scene = req.sanitize('distance_from_scene').escape();
    const availability = req.sanitize('availability').escape();
    const fk_OM_user_id = req.sanitize('fk_OM_user_id').escape();
    
    var query = "";
    var post = {
        birth_date: birth_date,
        rating: rating,
        phone_number: phone_number,
        email: email,
        distance_from_scene: distance_from_scene,
        availability: availability,
        fk_OM_user_id: fk_OM_user_id
    };
    query = connect.con.query('INSERT INTO Operation_Managers SET ?', post, function(err, rows, fields) {
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

//efetuar updade de todos os dados para um determinado manager_id
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const manager_id = req.params.manager_id;
    const birth_date = req.body.birth_date;
    const rating = req.body.rating;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const distance_from_scene = req.body.distance_from_scene;
    const availability = req.body.availability;
    const fk_OM_user_id = req.body.fk_OM_user_id;
    const status = req.body.status;

    
    var query = ""
    
    var put = {
        birth_date,
        rating,
        phone_number,
        email,
        distance_from_scene,
        availability,
        fk_OM_user_id,
        status
        
    }
    
    query = connect.con.query ('UPDATE Operation_managers SET ? where manager_id = ?', [put, manager_id], function(err, rows,
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


function logicalDelete (req, res) {
    //receber os dados do formuário que são enviados por post
    const manager_id = req.params.manager_id;
    const status = req.body.status;
    
    var query = "";
    
    var put = {
        status
    }

    query = connect.con.query('UPDATE Operation_Managers SET ? where manager_id = ?', [put, manager_id] , function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Request disabled with success!");
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

//função que apaga todos os dados de um manager_id
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const manager_id = req.params.manager_id;
    const post = {
        manager_id: manager_id,
    };
    connect.con.query('DELETE from Operation_managers where manager_id = ?', post, function(err, rows, fields) {
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
logicalDelete: logicalDelete,
deleteID: deleteID
};