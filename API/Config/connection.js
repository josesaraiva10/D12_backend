const mysql = require('mysql');

module.exports = {
    con: mysql.createConnection({
        host: 'remotemysql.com',
        user: 'HDP0tpHOen',
        password: 'NTsscTJj76',
        database: 'HDP0tpHOen'
    })
};