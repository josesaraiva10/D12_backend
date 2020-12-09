const express = require("express");
const router = express.Router();
const testimonials = require('../controllers/testimonials.controller.js');

router.get('/', testimonials.read);
//router.post('/', testimonials.save);
router.get('/:testimonial_id', testimonials.readById);
//router.put('/:testimonial_id', testimonials.update);
//router.delete('/:testimonial_id', testimonials.deleteID);

module.exports = router;