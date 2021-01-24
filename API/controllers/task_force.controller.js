const app = require('../app.js');
const connect = require('../config/connection.js');

//lê as tabelas das equipas
function read(req, res) {
    connect.con.query('SELECT * from Task_Force', (err, rows) => {
        if (err) throw err;
        console.log('The data from Task Force table are: \n', rows)
        res.send(rows);
    });
}

//lê os dados da equipa por um id
function readById(req, res) {
    let operational_id = req.params.operational_id;
    let mainQuery = 'SELECT * from Task_Force where operational_id = ?';
    connect.con.query(mainQuery, [operational_id], (err, rows) => {
        if (err) throw err;
        console.log('The Task Force with the id is: \n', rows)
        res.send(rows);
    });
}

/*function readByOccID(req, res) {
    let occurrence_id = req.params.occurrence_id;
    let mainQuery = 'select TF_operational_id, from (select fk_Occ_team_id       from Occurrences       where occurrence_id=?) as B       inner join Operational_Team as A       on B.fk_Occ_team_id=A.OT_team_id';
    connect.con.query(mainQuery, [occurrence_id], (err, rows) => {
        if (err) throw err;
        console.log('The Task Force with the the id is: \n', rows)
        res.send(rows);
    });
}*/
function readByOccID(req, res) {
    let occurrence_id = req.params.occurrence_id;
    let mainQuery = 'select operational_id,name,professional_certificate from Occurrences,Operational_Team, Task_Force where Occurrences.occurrence_id = ? and Occurrences.fk_Occ_team_id = Operational_Team.OT_team_id and Operational_Team.TF_operational_id = Task_Force.operational_id';
    connect.con.query(mainQuery, [occurrence_id], (err, rows) => {
        if (err) throw err;
        console.log('The Task Force with the the id is: \n', rows)
        res.send(rows);
    });
}


module.exports = {
read: read,
readById: readById,
readByOccID: readByOccID
};