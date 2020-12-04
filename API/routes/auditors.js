const express = require("express");
const app = express.Router();
const auditors = require('../controllers/auditors.controller.js');

app.get("/", function(req, res) {
    auditors.read(req, res);
});

app.get("/:auditors_id", function(req, res) {
    auditors.readById(req, res);
});


module.exports = app;