const express = require("express");
const router = express.Router();
const auditors = require('../controllers/auditors.controller.js');

router.get('/', auditors.read);
router.get('/:id', auditors.readById);
router.post("/", auditors.save);
router.put('/:id', auditors.update);
router.delete('/:id', auditors.deleteID);


module.exports = router;