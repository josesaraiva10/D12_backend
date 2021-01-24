const app = require('../app.js');
const connect = require('../config/connection.js');

function readOperationalsByOccurrenceID(req,res) {
    
    const occurence_id = req.sanitize('occurrence_id').escape();
    connect.con.query('SELECT Task_Force.* from Task_Force INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_operational_id = Task_Force.operational_id INNER JOIN Occurrences ON Occurrences.occurrence_id = Operational_Occurrence.fk_OO_occurrence_id where fk_OO_occurrence_id = ?;', [occurence_id], (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}

function readOperationalsAllOccurrences(req,res) {
    
    connect.con.query('SELECT * from Task_Force INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_operational_id = Task_Force.operational_id INNER JOIN Occurrences ON Occurrences.occurrence_id = Operational_Occurrence.fk_OO_occurrence_id;', (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}

function readOperationalsAllActiveOccurrences(req,res) {
    
    connect.con.query('SELECT * from Task_Force INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_operational_id = Task_Force.operational_id INNER JOIN Occurrences ON Occurrences.occurrence_id = Operational_Occurrence.fk_OO_occurrence_id where status1 = "A decorrer";', (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}

function readOperationalsAllEndedOccurrences(req,res) {

    connect.con.query('SELECT * from Task_Force INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_operational_id = Task_Force.operational_id INNER JOIN Occurrences ON Occurrences.occurrence_id = Operational_Occurrence.fk_OO_occurrence_id where status1 = "Terminado";', (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}

function countOperationalsAllOccurrences(req,res) {
    
    connect.con.query('SELECT COUNT(occurrence_id) as num_operationals, Occurrences.* FROM Occurrences INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_occurrence_id = Occurrences.occurrence_id group by occurrence_id order by num_operationals DESC;', (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}

function top5OccurrencesWithMostOperationals(req,res) {
    
    connect.con.query('SELECT COUNT(occurrence_id) as num_operationals, Occurrences.* FROM Occurrences INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_occurrence_id = Occurrences.occurrence_id group by occurrence_id order by num_operationals DESC LIMIT 5;', (err, rows) => {
        if(err) throw err;
        console.log('The data from operational_occurrence table are: \n', rows);
        res.send(rows);
    });
}

function top10OccurrencesWithMostOperationals(req,res) {
    
    connect.con.query('SELECT COUNT(occurrence_id) as num_operationals, Occurrences.* FROM Occurrences INNER JOIN Operational_Occurrence ON Operational_Occurrence.fk_OO_occurrence_id = Occurrences.occurrence_id group by occurrence_id order by num_operationals DESC LIMIT 10;', (err, rows) => {
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
    
    var query = "INSERT INTO Operational_Occurrence (fk_OO_occurrence_id, fk_OO_operational_id) VALUES ?";
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
readOperationalsByOccurrenceID: readOperationalsByOccurrenceID,
readOperationalsAllOccurrences: readOperationalsAllOccurrences,
readOperationalsAllActiveOccurrences: readOperationalsAllActiveOccurrences,
readOperationalsAllEndedOccurrences: readOperationalsAllEndedOccurrences,
top5OccurrencesWithMostOperationals: top5OccurrencesWithMostOperationals,
top10OccurrencesWithMostOperationals: top10OccurrencesWithMostOperationals,
countOperationalsAllOccurrences: countOperationalsAllOccurrences,
addOperationalToOccurence: addOperationalToOccurence
};