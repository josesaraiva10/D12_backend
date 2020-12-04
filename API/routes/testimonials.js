const express = require("express");
const router = express.Router();
const testimonials = require('../controllers/testimonials.controller.js');

router.get("/", testimonials.read);

router.get("/:testimonial_id", testimonials.readById);

module.exports = router;