const express = require("express");
const router = express.Router();
const operationalOccurrence = require('../controllers/operational_occurrence.controller.js');
const occurrences = require('../controllers/occurrences.controller.js');
const collaborators = require('../controllers/collaborators.controller.js');

router.get('/topOccurrencesWithMostOperationals', operationalOccurrence.top5OccurrencesWithMostOperationals);
router.get('/topOccurrencesWithMostCollaborators', collaborators.topOccurrencesWithMostCollaborators);
router.get('/countByStatus', occurrences.countByStatus);



module.exports = router;