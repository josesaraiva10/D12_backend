const express = require("express");
const router = express.Router();
const collaborators = require('../controllers/collaborators.controller.js');

router.get("/", collaborators.read);
router.get("/:collaborator_id", collaborators.readById);
router.post("/", collaborators.save);
router.put('/:collaborator_id', collaborators.update);
router.put('/collaborator/:collaborator_id', collaborators.logicalDelete);
router.delete('/:collaborator_id', collaborators.deleteID);

module.exports = router;