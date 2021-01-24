const express = require("express");
const router = express.Router();
const auditors = require('../controllers/auditors.controller.js');

router.get('/', auditors.read);
router.get('/:auditor_id', auditors.readById);
router.get('/email/:email', auditors.readByEmail);
router.post("/", auditors.save);
router.put('/:auditor_id', auditors.update);
router.delete('/:auditor_id', auditors.deleteID);
router.put('/deleteL/:auditor_id', auditors.logicalDelete);

module.exports = router;