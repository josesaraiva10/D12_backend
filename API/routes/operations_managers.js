const express = require("express");
const app = express.Router();
const operations_managers = require('../controllers/operations_managers.controller.js');

app.get("/", function(req, res) {
    operations_managers.read(req, res);
});

app.get("/:manager_id", function(req, res) {
    operations_managers.readById(req, res);
});


module.exports = app;