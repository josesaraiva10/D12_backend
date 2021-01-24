const express = require("express");
const router = express.Router();
const task_force = require('../controllers/task_force.controller.js');

router.get("/", task_force.read);
router.get('/operational/:operational_id', task_force.readById);
router.get('/occurrence/:occurrence_id', task_force.readByOccID);

router.post("/", task_force.save);

module.exports = router;