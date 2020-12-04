const express = require("express");
const router = express.Router();
const audits = require('../controllers/audits.controller.js');

router.get("/", audits.read);

router.get("/:audits_id", audits.readById);

module.exports = router;