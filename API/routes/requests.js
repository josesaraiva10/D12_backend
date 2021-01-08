const express = require("express");
const router = express.Router();
const requests = require('../controllers/requests.controller.js');


router.get('/', requests.read);
router.get('/:id', requests.readById);
router.post("/", requests.save);
router.put('/:id', requests.update);
router.put('/:id', requests.logicalDelete);
router.delete('/:id', requests.deleteID);

module.exports = router;
