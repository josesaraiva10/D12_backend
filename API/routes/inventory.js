const express = require("express");
const router = express.Router();
const inventory = require('../controllers/inventory.controller.js');

router.post('/create', function(req,res) {
   console.log("aaaaa", req.body.user.name); 
});

router.get("/", function(req, res) {
    inventory.read(req, res);
});

router.get("/:id", function(req, res) {
    inventory.readById(req, res);
});

//*****
router.get('/', inventory.read);
router('/:id', inventory.readID);
router.post("/", inventory.save);
router.put('/users/:id', router.update);
router.delete('/users/:id', router.deleteID);


module.exports = router;

