const express = require("express");
const router = express.Router();
const operationalOccurrence = require('../controllers/operational_occurrence.controller.js');

router.get('/getOperationalsInOccurrence', operationalOccurrence.readOperationalsByOccurrenceID);
router.get('/getOperationalsAllOccurrences', operationalOccurrence.readOperationalsAllOccurrences);
router.get('/getOperationalsAllActiveOccurrences', operationalOccurrence.readOperationalsAllActiveOccurrences);
router.get('/countOperationalsAllOccurrences', operationalOccurrence.countOperationalsAllOccurrences);
router.post('/addOperational', operationalOccurrence.addOperationalToOccurence);

module.exports = router;