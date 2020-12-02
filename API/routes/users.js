const express = require("express");
const app = express.Router();
const users = require('../controllers/users.controller.js');

app.get("/", function(req, res) {
    users.read(req, res);
});

app.get("/:usersid", function(req, res) {
    users.readById(req, res);
});


module.exports = app;