const express = require("express");
const router = express.Router();

const requests = require('../controllers/requests.controller.js');
const auditors = require('../controllers/auditors.controller.js');
const audits = require('../controllers/audits.controller.js');
const collaborators = require('../controllers/collaborators.controller.js');
const inventory = require('../controllers/inventory.controller.js');
const occurrences = require('../controllers/occurrences.controller.js');
const operation_managers = require('../controllers/operation_managers.controller.js');
const users = require('../controllers/users.controller.js');
const task_force = require('../controllers/task_force.controller.js');
const testimonials = require('../controllers/testimonials.controller.js');
const faqs = require('../controllers/faqs.controller.js');
const services = require('../controllers/services.controller.js');

module.exports = router;