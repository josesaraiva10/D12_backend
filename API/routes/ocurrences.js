const express = require("express");
const router = express.Router();
const ocurrences = require('../controllers/ocurrences.controller.js');

router.get("/", ocurrences.read);
router.post("/", ocurrences.save);
router.get("/:ocurrence_id", ocurrences.readById);
router.put('/:occurrence_id', ocurrences.update);
router.delete('/:occurrences_id', ocurrences.deleteID);

module.exports = router;
