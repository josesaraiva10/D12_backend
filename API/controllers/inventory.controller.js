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

// na parte do name l. 38
function updateRow(data) {
    let updateQuery = "UPDATE Inventory SET material_type = ? and availability = ? WHERE material_id = ?";
    let query = mysql.format(updateQuery,[data.material_type,data.availability, data.material_id]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows);
    });
}

//na parte do audit l.65
function deleteRow(material_id) {
    let deleteQuery = "DELETE from Inventory WHERE material_id = ?";
    let query = mysql.format(deleteQuery, ["Inventory", "material_id", material_id]);
    connect.con.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });
}

module.exports = {
read: read,
readById :readById,
addRow: addRow,
updateRow: updateRow,
deleteRow: deleteRow
};