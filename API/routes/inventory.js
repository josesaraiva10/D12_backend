const express = require("express");
const app = express.Router();
const inventory = require('../controllers/inventory.controller.js');

app.get("/", function(req, res) {
    inventory.read(req, res);
});

app.get("/:material_id", function(req, res) {
    inventory.readById(req, res);
});


module.exports = app;