const app = require('../app.js');
const connect = require('../Config/connection.js');



function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Faqs', function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}



module.exports = {
    read: read
};