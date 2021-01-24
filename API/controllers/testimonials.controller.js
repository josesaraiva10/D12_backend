const app = require('../app.js');
const connect = require('../config/connection.js');

function read(req, res) {
    connect.con.query('SELECT * from Testimonials', (err, rows) => {
        if (err) throw err;
        console.log('The data from Testimonials table are: \n', rows)
        res.send(rows);
    });
}

function readById(req, res) {
    let testimonials_id = req.params.id;
    let mainQuery = 'SELECT * from Testimonials where testimonials_id = ?';
    connect.con.query(mainQuery, [testimonials_id], (err, rows) => {
        if (err) throw err;
        console.log('The testimonial with the the id is: \n', rows)
        res.send(rows);
    });
}

function readTestOcc(req,res) {
    const occurence_id = req.sanitize('fk_Test_occurrence_id').escape();
    connect.con.query('SELECT testimonial_id, name, cc_number from Testimonials where fk_Test_occurrence_id=?', [occurence_id], (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(rows);
    });
}

function save(req, res) {
    //receber os dados do formuário que são enviados por post
    
    const name = req.sanitize('name').escape();
    const cc_number = req.sanitize('cc_number').escape();
    const email= req.sanitize('email').escape();
    const description = req.sanitize('description').escape();
    const fk_Test_occurrence_id = req.sanitize('fk_Test_occurrence_id').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const notes = req.sanitize('notes').escape();
    const job = req.sanitize('job').escape();
    const city = req.sanitize('city').escape();

    var query = "";

    var post = {
        name: name,
        cc_number: cc_number,
        email: email,
        description: description,
        fk_Test_occurrence_id,
        phone_number,
        job,
        city,
        notes
    };

    query = connect.con.query('INSERT INTO Testimonials SET ?', post, function(err, rows, fields) {
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
save: save,
readTestOcc: readTestOcc
};