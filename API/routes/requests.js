const express = require("express");
const router = express.Router();
const requests = require('../controllers/requests.controller.js');


router.get('/', requests.read);
router.get('/:request_id', requests.readById);
router.post("/", requests.save);
router.put('/:request_id', requests.update);
router.put('/request/:request_id', requests.logicalDelete);  
router.delete('/:request_id', requests.deleteID);

module.exports = router;
