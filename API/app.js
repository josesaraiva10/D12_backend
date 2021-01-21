const express = require("express");
const app = express();
const mysql = require('mysql');
const port = process.env.PORT;
const connect = require('./config/connection.js');
const cors = require('cors');


app.use(cors());
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));
//Port Listen
app.listen(port, () => {
    console.log('Server is running at port '+port);
});


module.exports = app;
require('./loader.js');