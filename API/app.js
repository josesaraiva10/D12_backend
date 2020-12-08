const express = require("express");
const app = express();
const mysql = require('mysql');
const port = process.env.port || 8080;
const connect = require('./Config/connection.js');


app.listen(port, function (err) {
    if (!err) {
    console.log('Your app is listening on ' + ' port ' + port);
    } 
    else {console.log(err);}
});

module.exports = app;
require('./loader.js');

