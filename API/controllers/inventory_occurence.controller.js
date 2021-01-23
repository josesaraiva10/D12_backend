const app = require('../app.js');
const connect = require('../config/connection.js');

function readAll(req,res) {
    
    const occurence_id = req.sanitize('fk_IO_occurrence_id').escape();
    connect.con.query('SELECT * from Inventory_of_the_Occurrence where fk_IO_occurrence_id=?', [occurence_id], (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(rows);
    });
}

function readMatOcc(req,res) {
    const occurence_id = req.sanitize('fk_IO_occurrence_id').escape();
    connect.con.query('SELECT Inventory.* from Inventory_of_the_Occurrence, Inventory where Inventory_of_the_Occurrence.fk_IO_occurrence_id=? and Inventory_of_the_Occurrence.fk_IO_material_id=Inventory.material_id', [occurence_id], (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(rows);
    });
}

function useInventoryInOccurence(req, res) {
    //receber os dados do formuário que são enviados por post
    const occurence_id = req.sanitize('occurence_id').escape();
    const material_ids = req.sanitize('material_ids').escape();
    var materials = material_ids.split(",");
    
    var query = "INSERT INTO Inventory_of_the_Occurrence (fk_IO_occurrence_id, fk_IO_material_id) VALUES ?";
    var post = [];
    
    materials.forEach(element => { 
        post.push([occurence_id, element]);
    }); 
    
    console.log("Inserting inventory on occurence:");
    
    query = connect.con.query(query, [post], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            
            console.log("Number of records inserted: " + rows.affectedRows);
            
            console.log("Updating availability of the materials: " + materials);
            
            updateAvailability(materials);
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

function updateAvailability(materials) {
    var query = "UPDATE Inventory SET availability = 0 where material_id IN (?)";
        
    query = connect.con.query(query, [materials], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Availability of the materials updated: " + rows.affectedRows);
        }
        else {
            console.log('Error while performing Query.', err);
        }
    });
}

module.exports = {
useInventoryInOccurence: useInventoryInOccurence,
readAll: readAll,
readMatOcc: readMatOcc
};