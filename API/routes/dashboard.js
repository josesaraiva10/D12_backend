const express = require("express");
const router = express.Router();
const operationalOccurrence = require('../controllers/operational_occurrence.controller.js');

router.get('/top5OccurrencesWithMostOperationals', operationalOccurrence.top5OccurrencesWithMostOperationals);

module.exports = router;