const express = require("express");
const router = express.Router();
const faqs = require('../controllers/faqs.controller.js');

router.get('/', faqs.read);

module.exports = router;