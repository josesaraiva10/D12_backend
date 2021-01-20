const express = require("express");
const router = express.Router();
const inventory = require('../controllers/inventory.controller.js');

router.get('/', inventory.read);
router.get('/readById', inventory.readById);
router.get('/occurrence/:id', inventory.readByOccurrenceId);
router.get('/available', inventory.readAvailableOnly);
router.post("/", inventory.save);
router.put('/:id', inventory.update);
router.delete("/:id", inventory.deleteID);


module.exports = router;