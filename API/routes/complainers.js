const express = require("express");
const router = express.Router();
const complainers = require('../controllers/complainers.controller.js');

router.get('/', complainers.read);
router.get('/:id', complainers.readById);
router.post("/", complainers.save);
router.put('/:id', complainers.update);
router.delete('/:id', complainers.deleteID);


module.exports = router;