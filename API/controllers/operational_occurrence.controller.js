const app = require('../app.js');
const connect = require('../config/connection.js');

function readAll(req,res) {
    
    const occurence_id = req.sanitize('fk_OO_occurrence_id').escape();
    connect.con.query('SELECT * from Operational_Occurrence where fk_OO_occurrence_id=?', [occurence_id], (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}    


function addOperationalToOccurence(req, res) {
    //receber os dados do formuário que são enviados por post
    const occurence_id = req.sanitize('occurence_id').escape();
    const operational_ids = req.sanitize('operational_ids').escape();
    var operationals = operational_ids.split(",");
    
    var query = "INSERT INTO Operational_Occurrences (fk_OO_operational_id, fk_CO_occurrence_id) VALUES ?";
    var post = [];
    
    operationals.forEach(element => { 
        post.push([occurence_id, element]);
    }); 
    
    console.log("Adding operational to occurence:");
    
    query = connect.con.query(query, [post], function(err, rows, fields) {
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
readAll: readAll,
addOperationalToOccurence: addOperationalToOccurence
};