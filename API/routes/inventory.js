const express = require("express");
const router = express.Router();
const inventory = require('../controllers/inventory.controller.js');

router.get('/', inventory.read);
router.get('/:inventory_id', inventory.readById);
router.post("/", inventory.save);
router.put("/", inventory.update);
router.delete("/", inventory.deleteID);


module.exports = router;

