const express = require("express");
const app = express();
const mysql = require('mysql');
const port = process.env.port || 8080;
const connect = require('./Config/connection.js');
const cors = require('cors');

//Port Listen
app.listen(port, () => {
    console.log('Server is running at port '+port);
});


module.exports = app;
require('./loader.js');