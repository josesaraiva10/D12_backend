const express = require("express");
const router = express.Router();
const audits = require('../controllers/audits.controller.js');

router.get('/', audits.read);
router.get('/:id', audits.readById);
router.post("/", audits.save);
router.put('/:id', audits.update);
router.delete('/:id', audits.deleteID);


module.exports = router;