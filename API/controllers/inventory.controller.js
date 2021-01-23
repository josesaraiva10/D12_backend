const app = require('../app.js');
const connect = require('../config/connection.js');

function read(req,res) {
    connect.con.query('SELECT * from Inventory', (err, rows) => {
        if(err) throw err;
        console.log('The data from inventory table are: \n', rows);
        res.send(rows);
    });
}

function readById(req,res) {
    const material_id = req.sanitize('material_id').escape();
    let mainQuery = 'SELECT * from Inventory where material_id = ?';
    connect.con.query(mainQuery, [material_id], (err, rows) => {
        if(err) throw err;
        console.log('The ocurrence with the id is: \n', rows);
        res.send(rows[0]); 
    });
} 

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    let material_id = req.params.id
    var query = "";
        
    query = connect.con.query('UPDATE Inventory SET ? where material_id = ?', [req.body, material_id], function(err, rows, fields) {
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
    

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    let material_id = req.params.id
    var query = "";
    query = connect.con.query('DELETE from Inventory where material_id = ?', [material_id], function(err, rows, fields) {
        console.log(query.sql);
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

function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const material_type = req.sanitize('material_type').escape();
    const availability = req.sanitize('availability').escape();
    
    
    var query = "";
    var post = {
        material_type: material_type,
        availability: availability,
      
    };
    query = connect.con.query('INSERT INTO Inventory SET ?', post, function(err, rows, fields) {
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

function readByOccurrenceId(req,res) {
    let material_id = req.params.id;
    let mainQuery = 'SELECT Inventory.* from Inventory INNER JOIN Inventory_of_the_Occurrence on Inventory_of_the_Occurrence.fk_IO_material_id = Inventory.material_id where Inventory_of_the_Occurrence.fk_IO_occurrence_id = ?;';
    connect.con.query(mainQuery, [material_id], (err, rows) => {
        if(err) throw err;
        console.log('The inventory of the occurrence with the id is: \n', rows);
        res.send(rows);
    });
}

function readAvailableOnly(req,res) {
    let mainQuery = 'SELECT * from Inventory where availability = 1';
    connect.con.query(mainQuery, (err, rows) => {
        if(err) throw err;
        console.log('The inventory available is: \n', rows);
        res.send(rows); 
    });
}


module.exports = {
read: read,
readById: readById,
update: update,
deleteID: deleteID,
save: save,
readByOccurrenceId: readByOccurrenceId,
readAvailableOnly: readAvailableOnly
};