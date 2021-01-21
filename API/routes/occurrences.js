const express = require("express");
const router = express.Router();
const occurrences = require('../controllers/occurrences.controller.js');

router.get("/", occurrences.read);
router.get("/:occurrence_id", occurrences.readById);
router.post("/", occurrences.save);
router.put('/occurrence/:occurrence_id', occurrences.logicalDelete);
router.put('/:occurrence_id', occurrences.update);
router.delete('/occurrence_id', occurrences.deleteID);
router.put('/start_date/:occurrence_id',occurrences.updateOccurrenceArrival);
module.exports = router;
