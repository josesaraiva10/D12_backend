const express = require("express");
const router = express.Router();
const users = require('../controllers/users.controller.js');

router.get('/', users.read);
router.get('/:user_id', users.readById);

module.exports = router;