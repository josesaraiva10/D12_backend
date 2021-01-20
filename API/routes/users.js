const express = require("express");
const router = express.Router();
const users = require('../controllers/users.controller.js');

router.get('/', users.read);
router.get('/:id', users.readById);
router.post("/", users.save);
router.put('/:id', users.update);
router.put('/user/:user_id', users.logicalDelete);
router.delete('/:id', users.deleteID);


module.exports = router;