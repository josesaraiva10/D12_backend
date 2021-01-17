const router = require('express').Router();
const controllerMail = require('../controllers/mail.controller.js');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

router.get('/', function(req, res) {
    res.send("FCA Book");
    res.end();
});

router.post('/contacts/emails', controllerMail.send);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        /*  res.status(jsonMessages.login.unauthorized.status).send(jsonMessages.login.unauthorized);*/
        return next();
    }
}
