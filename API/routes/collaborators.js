const express = require("express");
const router = express.Router();
const collaborators = require('../controllers/collaborators.controller.js');

router.get("/", collaborators.read);

router.get("/:collaborators_id", collaborators.readById);

module.exports = router;