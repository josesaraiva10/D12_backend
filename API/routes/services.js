const express = require("express");
const router = express.Router();
const services = require('../controllers/services.controller.js');

router.get('/', services.read);
router.post('/', services.save);

module.exports = router;