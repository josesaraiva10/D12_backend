 global.mysql = require('mysql');

module.exports = {
    con: global.mysql.createConnection({
        host: 'remotemysql.com',
        user: 'HDP0tpHOen',
        password: 'NTsscTJj76',
        database: 'HDP0tpHOen'
    })
};