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

function save(req, res) {
    const name = req.sanitize('name').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const professional_certificate = req.sanitize('professional_certificate').escape();
    const operational_type = req.sanitize('operational_type').escape();
    const points = req.sanitize('points').escape();
    
    var query = "";
    var post = {
        name: name,
        email: email,
        password: password,
        operational_type: operational_type,
        professional_certificate: professional_certificate,
        points: points
    };
    query = connect.con.query('INSERT INTO Task_Force SET ?', post, function(err, rows, fields) {
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
            else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        }
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
readByOccID: readByOccID,
save:save
};