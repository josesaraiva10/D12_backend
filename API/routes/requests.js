const express = require("express");
const app = express.Router();
const requests = require('../controllers/requests.controller.js');

app.get("/", function(req, res) {
    requests.read(req, res);
});

app.get("/:requestsid", function(req, res) {
    requests.readById(req, res);
});

app.post("/", function(req,res) {
    requests.save(req,res)
});




module.exports = app;