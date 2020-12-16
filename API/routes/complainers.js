const express = require("express");
const router = express.Router();
const complainers = require('../controllers/complainers.controller.js');

router.get('/', complainers.read);
router.get('/complainers/:complainer_cc', complainers.readById);
router.post("/", complainers.save);
router.put('/complainers/:complainer_cc', complainers.update);
router.delete('/complainers/:complainer_cc', complainers.deleteID);


module.exports = router;