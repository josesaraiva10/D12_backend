const express = require("express");
const router = express.Router();
const requests = require('../controllers/requests.controller.js');


router.get('/', requests.read);
router('/:id', requests.readID);
router.post("/", requests.save);
router.put('/users/:id', router.update);
router.delete('/users/:id', router.deleteID);

module.exports = router;
