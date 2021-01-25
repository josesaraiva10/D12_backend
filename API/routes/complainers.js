const express = require("express");
const router = express.Router();
const complainers = require('../controllers/complainers.controller.js');

router.get('/', complainers.read);
router.get('/:complainer_cc', complainers.readById);
router.post("/", complainers.save);
router.put('/:complainer_cc', complainers.update);
router.put('/complainer/:comlainer_cc', complainers.logicalDelete);
router.delete('/:complainer_cc', complainers.deleteID);


module.exports = router;