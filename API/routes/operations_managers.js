const express = require("express");
const router = express.Router();
const operations_managers = require('../controllers/operations_managers.controller.js');

router.get('/', operations_managers.read);
router.get('/:managers_id', operations_managers.readID);
router.post("/", operations_managers.save);
router.put('/operations_managers/:managers_id', router.update);
router.delete('/operations_managers/:managers_id', router.deleteID);


module.exports = router;