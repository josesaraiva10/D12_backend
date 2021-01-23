const express = require("express");
const router = express.Router();
const inventoryOccurence = require('../controllers/inventory_occurence.controller.js');

router.post('/setInventory', inventoryOccurence.useInventoryInOccurence);
router.get('/:fk_IO_occurrence_id',inventoryOccurence.readAll);
router.get('/:fk_IO_occurrence_id/materials',inventoryOccurence.readMatOcc);

module.exports = router;