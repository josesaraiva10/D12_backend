const express = require("express");
const router = express.Router();
const occurences = require('../controllers/occurrences.controller.js');

router.get("/", occurences.read);
router.post("/", occurences.save);
router.get("/:id", occurences.readById);
router.put('/:id', occurences.update);
router.delete('/:id', occurences.deleteID);

module.exports = router;