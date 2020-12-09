const express = require("express");
const router = express.Router();
const users = require('../controllers/users.controller.js');

router.get('/', users.read);
router.get('/:user_id', users.readById);
router.post("/", users.save);
router.put('/:user_id', users.update);
router.delete('/:user_id', users.deleteID);


module.exports = router;