const express = require("express");
const router = express.Router();

const requests = require('../controllers/requests.controller.js');
const auditors = require('../controllers/auditors.controller.js');
const audits = require('../controllers/audits.controller.js');
const collaborators = require('../controllers/collaborators.controller.js');
const inventory = require('../controllers/inventory.controller.js');
const ocurrences = require('../controllers/ocurrences.controller.js');
const operations_managers = require('../controllers/operations_managers.controller.js');
const users = require('../controllers/users.controller.js');
const task_force = require('../controllers/task_force.controller.js');
const testimonials = require('../controllers/testimonials.controller.js');