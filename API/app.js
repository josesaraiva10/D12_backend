const express = require("express");
const app = express();
const mysql = require('mysql');
const port = process.env.port || 8080;
const connect = require('./Config/connection.js');

//Routes
const index = require('./routes/index');
const users = require('./routes/users');
const requests = require('./routes/requests');

app.use('/', index);
app.use('/users', users);
app.use('/requests',requests);

//Port Listen
app.listen(port, () => {
    console.log('Server is running at port '+port);
});

module.exports = app;
require('./loader.js');