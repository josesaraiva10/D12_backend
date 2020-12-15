const express = require("express");
const router = express.Router();
const inventory = require('../controllers/inventory.controller.js');

router.get('/', inventory.read);
router.get('/:id', inventory.readById);
router.post("/", inventory.save);
router.put("/", inventory.update);
router.delete("/:id", inventory.deleteID);
router.get('/occurence/:id', inventory.readByOcurrenceId);

module.exports = router;

