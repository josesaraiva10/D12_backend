const express = require("express");
const router = express.Router();
const inventory = require('../controllers/inventory.controller.js');

router.get('/', inventory.read);
router.get('/:inventory_id', inventory.readById);
router.post("/", inventory.save);
router.put('/:inventory_id', inventory.update);
router.delete(':inventory_id', inventory.deleteID);


module.exports = router;

