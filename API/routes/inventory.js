const express = require("express");
const router = express.Router();
const inventory = require('../controllers/inventory.controller.js');

router.get('/', inventory.read);
router.get('/:id', inventory.readById);
router.post("/", inventory.save);
router.put('/:id', inventory.update);
router.delete("/:id", inventory.deleteID);
router.get('/occurrence/:id', inventory.readByOccurrenceId);

module.exports = router;

