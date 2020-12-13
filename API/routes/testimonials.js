const express = require("express");
const router = express.Router();
const testimonials = require('../controllers/testimonials.controller.js');

router.get('/', testimonials.read);
router.get('/:id', testimonials.readById);
router.post('/', testimonials.save);

module.exports = router;