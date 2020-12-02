const express = require("express");
const app = express.Router();
const ocurrences = require('../controllers/ocurrences.controller.js');

app.get("/", function(req, res) {
    ocurrences.read(req, res);
});

app.get("/:ocurrence_id", function(req, res) {
    ocurrences.readById(req, res);
});


module.exports = app;