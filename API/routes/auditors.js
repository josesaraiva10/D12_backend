const express = require("express");
const router = express.Router();
const auditors = require('../controllers/auditors.controller.js');

router.get("/", auditors.read);

router.get("/:auditors_id", auditors.readById);

module.exports = router;