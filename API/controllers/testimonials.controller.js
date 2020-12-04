const app = require('../app.js');
const connect = require('../Config/connection.js');

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
