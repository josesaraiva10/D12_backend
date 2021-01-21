const app = require('../app.js');
const connect = require('../config/connection.js');

function addCollaboratorToOccurence(req, res) {
    //receber os dados do formuário que são enviados por post
    const occurence_id = req.sanitize('occurence_id').escape();
    const collaborator_ids = req.sanitize('collaborator_ids').escape();
    var collaborators = collaborator_ids.split(",");
    
    var query = "INSERT INTO Collaborators_at_Occurrences (fk_CO_collaborator_id, fk_CO_occurrence_id) VALUES ?";
    var post = [];
    
    collaborators.forEach(element => { 
        post.push([occurence_id, element]);
    }); 
    
    console.log("Adding collaborator to occurence:");
    
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
addCollaboratorToOccurence: addCollaboratorToOccurence
};