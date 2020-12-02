const express = require("express");
const app = express.Router();

app.get("/", function(req, res) {
    res.send('Home Page');
});

module.exports = app;