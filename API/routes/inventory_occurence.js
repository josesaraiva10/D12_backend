const express = require("express");
const router = express.Router();
const inventoryOccurence = require('../controllers/inventory_occurence.controller.js');

router.post('/setInventory', inventoryOccurence.useInventoryInOccurence);


module.exports = router;