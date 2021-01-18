const express = require("express");
const router = express.Router();
const occurrences = require('../controllers/occurrences.controller.js');

router.get("/", occurrences.read);
router.get("/:occurrence_id", occurrences.readById);
router.post("/", occurrences.save);
router.put('/occurrence/:occurrence_id', occurrences.logicalDelete);
router.put('/:occurrerrence_id', occurrences.update);
router.delete('/occurrencence_id', occurrences.deleteID);
router.get('/:occurrence_id/operationals',occurrences.readOperationalFromOccurrence);
router.put('/:occurrence_id/operationals/:user_id',occurrences.updateOperationalOccurrencePresence)

module.exports = router;