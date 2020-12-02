const express = require("express");
const app = express.Router();
const collaborators = require('../controllers/collaborators.controller.js');

app.get("/", function(req, res) {
    collaborators.read(req, res);
});

app.get("/:collaborators_id", function(req, res) {
    collaborators.readById(req, res);
});


module.exports = app;