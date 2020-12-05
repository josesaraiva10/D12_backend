const app = require('../app.js');
const connect = require('../Config/connection.js');

function read(req,res) {
    connect.con.query('SELECT * from Inventory', (err, rows) => {
        if(err) throw err;
        console.log('The data from inventory table are: \n', rows)
        res.send(rows);
    });
}

function readById(req,res) {
    let material_id = req.params.id;
    let mainQuery = 'SELECT * from Inventory where material_id = ?';
    connect.con.query(mainQuery, [material_id], (err, rows) => {
        if(err) throw err;
        console.log('The ocurrence with the id is: \n', rows)
        res.send(rows);
    });
} 

function addRow(data) {
    let insertQuery = 'INSERT INTO Inventory (material_id, material_type, availability) VALUES ()';
    let query = global.mysql.format(insertQuery,["Inventory","material_id","material_type","availability"]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const material_id = req.sanitize('material_id').escape();
    const material_type = req.sanitize('material_type').escape();
    const availability = req.sanitize('availability').escape();
  
        const iduser = req.sanitize('id').escape(); console.log("without hahsh:" + req.body.pass);
        var query = "";
        var update = {
            material_id,
            material_type,
            availability,
            
        }; query = connect.con.query('INSERT INTO inventory SET material_id = ?, material_type = ?, availability = ?,  where material_id =?', update, function(err, rows,
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
    

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const material_id = req.sanitize('material_id').escape();
    const post = {
        material_id: material_id
    };
    connect.con.query('DELETE from inventory where material_id = ?', post, function(err, rows, fields) {
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
    const material_id = req.sanitize('material_id').escape();
    const material_type = req.sanitize('material_type').escape();
    const availability = req.sanitize('availability').escape();
    
    var query = "";
    var post = {
        material_id: material_id,
        material_type: material_type,
        availability: availability,
      
    };
    query = connect.con.query('INSERT INTO inventory SET ?', post, function(err, rows, fields) {
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



module.exports = {
read: read,
readById: readById,
addRow: addRow,
update: update,
deleteID: deleteID,
save: save
};