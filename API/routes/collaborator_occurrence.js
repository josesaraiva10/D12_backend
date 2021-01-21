const express = require("express");
const router = express.Router();
const collaboratorOccurence = require('../controllers/collaborator_occurence.controller.js');

router.post('/addCollaborator', collaboratorOccurence.addCollaboratorToOccurence);


module.exports = router;