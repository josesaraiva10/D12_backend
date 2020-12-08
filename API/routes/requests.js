const express = require("express");
const router = express.Router();
const requests = require('../controllers/requests.controller.js');


router.get('/', requests.read);
router.get('/:requests_id', requests.readById);
router.post("/", requests.save);
router.put('/:requests_id', requests.update);
router.delete('/:requests_id', requests.deleteID);

module.exports = router;
