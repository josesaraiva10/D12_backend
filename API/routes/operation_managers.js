const express = require("express");
const router = express.Router();
const operation_managers = require('../controllers/operation_managers.controller.js');

router.get('/', operation_managers.read);
router.get('/:id', operation_managers.readById);
router.post("/", operation_managers.save);
router.put('/:id', operation_managers.update);
router.delete('/:id', operation_managers.deleteID);


module.exports = router;