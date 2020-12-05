const express = require("express");
const router = express.Router();
const ocurrences = require('../controllers/ocurrences.controller.js');

router.get("/", ocurrences.read);

router.get("/:ocurrence_id", ocurrences.readById);

router.post("/", ocurrences.sa)
module.exports = router;