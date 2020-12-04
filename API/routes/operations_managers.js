const express = require("express");
const router = express.Router();
const operations_managers = require('../controllers/operations_managers.controller.js');

router.get("/", operations_managers.read);

router.get("/:managers_id", operations_managers.readById);

module.exports = router;