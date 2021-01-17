const app = require('../app.js');
const connect = require('../Config/connection.js');

//_________________________________________________________READ______________________________________________________________________

function read(req, res) {
    connect.con.query('SELECT * from Occurrences', (err, rows) => {
        if (err) throw err;
        console.log('The data from occurrences table are: \n', rows);
        res.send(rows);
    });
}

//_________________________________________________________READ BY ID______________________________________________________________________

function readById(req, res) {
    let occurrence_id = req.params.occurrence_id;
    let mainQuery = 'SELECT * from Occurrences where occurrence_id = ?';
    connect.con.query(mainQuery, [occurrence_id], (err, rows) => {
        if (err) throw err;
        console.log('The occurrence with the id: ' + occurrence_id + ' is: \n', rows);
        res.send(rows);
    });
}

//_________________________________________________________SAVE______________________________________________________________________

function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const start_date = req.sanitize('start_date').escape();
    const end_date = req.sanitize('end_date').escape();
    const status1 = req.sanitize('status1').escape();
    const local = req.sanitize('local').escape();
    const evaluation = req.sanitize('evaluation').escape();
    const access_code = req.sanitize('access_code').escape();
    const services = req.sanitize('services').escape();
    const status2 = req.sanitize('status2').escape();
    const fk_Occ_team_id = req.sanitize('fk_Occ_team_id').escape();
    const fk_Occ_manager_id = req.sanitize('fk_Occ_manager_id').escape();
    const fk_Occ_request_id = req.sanitize('fk_Occ_request_id').escape();
    const filed = req.sanitize('filed').escape();
    
    var query = "";
    
    var post = {
        start_date : start_date,
        end_date : end_date,
        status1 : status1,
        local : local,
        evaluation : evaluation,
        access_code : access_code,
        services : services,
        status2 : status2,
        fk_Occ_manager_id : fk_Occ_manager_id,
        fk_Occ_team_id : fk_Occ_team_id,
        fk_Occ_request_id : fk_Occ_request_id,
        filed : filed
        
    };

    query = connect.con.query('INSERT INTO Occurrences SET ?', [post], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "Message": "Data inserted with success on Occurences"
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

//_________________________________________________________UPDATE__________________________________________________________________

function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const occurrence_id = req.params.occurence_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const status1 = req.body.status1;
    const local = req.body.local;
    const evaluation = req.body.evaluation;
    const access_code = req.body.access_code;
    const fk_Occ_manager_id = req.body.fk_Occ_manager_id;
    const fk_Occ_team_id = req.body.fk_Occ_team_id;
    const fk_Occ_request_id = req.body.fk_Occ_request_id;
    const services = req.body.services;
    const status2 = req.body.status2;
    const filed = req.body.filed;
    
 var query = "";
 
 var put = {
     start_date,
     end_date,
     status1,
     local,
     evaluation,
     access_code,
     fk_Occ_manager_id,
     fk_Occ_team_id,
     fk_Occ_request_id,
     services,
     status2,
     filed
 } 
 

 
    query = connect.con.query('Update Occurrences SET ? WHERE occurrence_id = ?', [put, occurrence_id], function(err, rows,fields) {
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

//_________________________________________________________DELETEID__________________________________________________________________

function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const occurrence_id = req.params.occurence_id;
    
    connect.con.query('DELETE from Occurrences where occurrence_id = ?', [occurrence_id], function(err, rows, fields) {
       if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send(
                    "Occurence not found"
                );
            }
            else {
                res.status(200).send(
                    "Occurence deleted with success!"
                );
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}
       
//_________________________________________________________LOGICALDELETE_______________________________________________________________

function logicalDelete (req, res) {
    //receber os dados do formuário que são enviados por post
    const occurrence_id = req.params.occurrence_id;
    const status = req.body.status2;
    
    var query = "";
    
    var put = {
        status
    }

    query = connect.con.query('UPDATE Occurrences SET ? where occurrence_id = ?', [put, occurrence_id], function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).send("Occurence disabled with success!");
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}


module.exports = {
    read: read,
    readById: readById,
    save: save,
    update: update,
    deleteID: deleteID,
    logicalDelete: logicalDelete,
};
