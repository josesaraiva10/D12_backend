const express = require("express");
const router = express.Router();
const occurrences = require('../controllers/occurrences.controller.js');

router.get("/", occurrences.read);
router.get("/:id", occurrences.readById);
router.post("/", occurrences.save);
router.put('/:id', occurrences.update);
router.put('/:id', occurrences.logicalDelete);
router.delete('/:id', occurrences.deleteID);

module.exports = router;