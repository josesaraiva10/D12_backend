const app = require('../app.js');
const connect = require('../config/connection.js');

// lê toda a informação que está contida na tabela dos users
function read(req,res) {
    connect.con.query('SELECT * from users', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(rows);
    });
}

// lê informação de um user pelo seu id
function readById(req,res) {
    let userID = req.params.id;
    let mainQuery = 'SELECT users.*, task_force.* from users,task_force where users.id = ? and users.email=task_force.email';
    connect.con.query(mainQuery, [userID], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the id is: \n', rows);
        res.send(rows);
    });
}

// dá user_id a partir de email
function readByEmail(req,res) {
    const email = req.params.email;
    let mainQuery = 'SELECT * from users where email = ?';
    connect.con.query(mainQuery, [email], (err, rows) => {
        if(err) throw err;
        console.log('The user with the the email is: \n', rows);
        res.send(rows);
    });
}

//guarda os valores existentes
function save(req, res) {
    //receber os dados do formuário que são enviados por post

    const nome = req.sanitize('nome').escape();
    const apelido = req.sanitize('apelido').escape();
    const username = req.sanitize('username').escape();
    const tipo = req.sanitize('tipo').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const sobre = req.sanitize('sobre').escape();
    const last_login = req.sanitize('last_login').escape();
    const data_nascimento = req.sanitize('data_nascimento').escape();
    const status = req.sanitize('status').escape();
    const createdAt = req.sanitize('createdAt').escape();
    const updatedAt = req.sanitize('updatedAt').escape();
     
    var query = "";

    var post = {
        nome: nome,
        apelido: apelido,
        username: username,
        tipo: tipo,
        email: email,
        password: password,
        sobre: sobre,
        data_nascimento: data_nascimento,
        last_login: last_login,
        status: status,
        createdAt: createdAt,
        updatedAt: updatedAt
    };

    query = connect.con.query('INSERT INTO users SET ?', post, function(err, rows, fields) {
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
    const id = req.sanitize('id').escape();
    const nome = req.sanitize('nome').escape();
    const apelido = req.sanitize('apelido').escape();
    const username = req.sanitize('username').escape();
    const tipo = req.sanitize('tipo').escape();
    const email = req.sanitize('email').escape();

    var query = "";
    
    var put = {
        nome,
        apelido,
        username,
        tipo,
        email
    }
    
    query = connect.con.query('UPDATE users SET ? where id = ?',[put,id], function(err, rows,
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

function updatePassword(req, res) {
    const id = req.sanitize('id').escape();
    const password = req.sanitize('password').escape();
    
    let put = {
        password
    }

    var query = "";
    
    query = connect.con.query('UPDATE users SET password = ? where id = ?',[put,id], function(err, rows,
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
    const id = req.params.id;
    const status = req.body.status;
    
    var query = "";
    
    var put = {
        status
    }

    query = connect.con.query('UPDATE users SET ? where id = ?', [put, id], function(err, rows, fields) {
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




//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const id = req.params.id;
   
    connect.con.query('DELETE from users where id = ?', [id], function(err, rows, fields) {
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
        readByEmail: readByEmail,
        save: save,
        update: update,
        logicalDelete: logicalDelete,
        deleteID: deleteID,
        updatePassword: updatePassword
    };