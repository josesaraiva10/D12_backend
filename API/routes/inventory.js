const express = require("express");
const app = express();
const inventory = require('../controllers/inventory.controller.js');

app.post('/create', function(req,res) {
   console.log("aaaaa", req.body.user.name); 
});

app.get("/", function(req, res) {
    inventory.read(req, res);
});

app.get("/:id", function(req, res) {
    inventory.readById(req, res);
});



module.exports = app;

