const express = require("express");
const router = express.Router();
const task_force = require('../controllers/task_force.controller.js');

router.get("/", task_force.read);
router.get("/:task_force_id", task_force.readById);

module.exports = router;