const express = require("express");
const router = express.Router();
const requests = require('../controllers/requests.controller.js');


router.get('/', requests.read);
router.get('/:requests_id', requests.readID);
router.post("/", requests.save);
router.put('/:requests_id', router.update);
router.delete('/:requests_id', router.deleteID);

module.exports = router;
