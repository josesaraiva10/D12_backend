const express = require("express");
const router = express.Router();
const occurrences = require('../controllers/occurrences.controller.js');

router.get("/", occurrences.read);
router.get("/:id", occurrences.readById);
router.post("/", occurrences.save);
router.put('/:occurrence_id', occurrences.update);
router.delete('/:occurrence_id', occurrences.deleteID);

module.exports = router;