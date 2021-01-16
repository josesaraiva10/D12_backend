const express = require("express");
const router = express.Router();
const occurrences = require('../controllers/occurrences.controller.js');

router.get("/", occurrences.read);
router.get("/:occurence_id", occurrences.readById);
router.post("/", occurrences.save);
router.put('/:occurence_id', occurrences.update);
router.put('/occurence/:occurence_id', occurrences.logicalDelete);
router.delete('/:occurence_id', occurrences.deleteID);

module.exports = router;