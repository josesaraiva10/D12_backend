const express = require("express");
const router = express.Router();
const complainers = require('../controllers/complainers.controller.js');

router.get('/', complainers.read);
router.get('/:id', complainers.readById);
router.post("/", complainers.save);
router.put('/:complainers_cc', complainers.update);
router.delete('/:complainers_cc', complainers.deleteID);


module.exports = router;