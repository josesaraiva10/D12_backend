const express = require("express");
const router = express.Router();
const evaluations = require('../controllers/evaluations.controller.js');

router.get('/', evaluations.read);
router.get('/:evaluation_id', evaluations.readById);
router.put('/grade/:evaluation_id', evaluations.sumGrade);
router.post("/", evaluations.save);
router.put('/:evaluation_id', evaluations.update);
router.delete('/:evaluation_id', evaluations.deleteID);

module.exports = router;