const express = require("express");
const router = express.Router();
const occurences = require('../controllers/occurrences.controller.js');

router.get("/", occurences.read);
router.post("/", occurences.save);
router.get("/:occurrence_id", occurences.readById);
router.put('/:occurrence_id', occurences.update);
router.delete('/:occurrence_id', occurences.deleteID);

module.exports = router;