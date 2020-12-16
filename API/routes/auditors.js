const express = require("express");
const router = express.Router();
const auditors = require('../controllers/auditors.controller.js');

router.get('/', auditors.read);
router.get('/:auditor_id', auditors.readById);
router.post("/", auditors.save);
router.put('/:auditor_id', auditors.update);
router.delete('/:auditor_id', auditors.deleteID);


module.exports = router;