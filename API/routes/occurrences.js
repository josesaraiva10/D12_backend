const express = require("express");
const router = express.Router();
const occurrences = require('../controllers/occurrences.controller.js');

router.get("/", occurrences.read);
router.get("/:occurrence_id", occurrences.readById);
router.post("/", occurrences.save);
router.put('/:occu/:occurrence_id', occurrences.logicalDelete);
router.delete('/:occurrerrence_id', occurrences.update);
router.put('/occurrencence_id', occurrences.deleteID);

module.exports = router;