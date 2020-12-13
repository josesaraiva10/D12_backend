const express = require("express");
const router = express.Router();
const operation_managers = require('../controllers/operation_managers.controller.js');

router.get('/', operation_managers.read);
router.get('/:manager_id', operation_managers.readById);
router.post("/", operation_managers.save);
router.put('/:manager_id', operation_managers.update);
router.delete('/:manager_id', operation_managers.deleteID);


module.exports = router;