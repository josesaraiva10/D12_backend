const express = require("express");
const router = express.Router();
const audits = require('../controllers/audits.controller.js');

router.get('/', audits.read);
router.get('/:audit_id', audits.readById);
router.get('/status/:status', audits.readByStatus); 
//router.get('/status/:status/auditor/:auditor_id', audits.readByStatusAuditor); 
router.get('/occurrence/:occurrence_id', audits.readByOccurrence);
router.post("/", audits.save);
router.put('/:audit_id', audits.update);
router.put('/updateGrade/:audit_id', audits.updateGrade);
router.put('/updateCoord/:audit_id', audits.updateCoord);
router.delete('/:audit_id', audits.deleteID);
router.put('/deleteL/:audit_id', audits.logicalDelete);

module.exports = router;