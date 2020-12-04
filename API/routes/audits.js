const express = require("express");
const app = express.Router();
const audits = require('../controllers/audits.controller.js');

app.get("/", function(req, res) {
    audits.read(req, res);
});

app.get("/:audits_id", function(req, res) {
    audits.readById(req, res);
});


module.exports = app;