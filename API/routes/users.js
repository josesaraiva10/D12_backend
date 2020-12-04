const express = require("express");
const router = require('express').Router();
const users = require('../controllers/users.controller.js');

router.get('/', users.read);
router.get('/:id', users.readID);

module.exports = router;