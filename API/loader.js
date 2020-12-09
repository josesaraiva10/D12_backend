const app = require('./app.js');
const router = require('./routes/mainroutes.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//Adicionar o validator ao middleware
app.use(bodyParser.json(),bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator()); 
app.use(cookieParser());

//obriga a utilizar as cookies
app.use(function (req, res, next) {
// check if client sent cookie
var cookie = req.cookies.cookieName;
if (cookie === undefined) {
// no: set a new cookie
var randomNumber = Math.random().toString();
randomNumber = randomNumber.substring(2, randomNumber.length);
res.cookie('cookieName', randomNumber, {
maxAge: 900000,
httpOnly: true,
secure: true
});
console.log('cookie created successfully');
} else { // yes, cookie was already present
console.log('cookie exists', cookie);
}
next(); // <-- important!
});


//loader calls all routes

const index = require('./routes/index.js');
const requests = require('./routes/requests.js');
const users = require('./routes/users.js');
const auditors = require('./routes/auditors.js');
const audits = require('./routes/audits.js');
const inventory = require('./routes/inventory.js');
const collaborators = require('./routes/collaborators.js');
const occurrences = require('./routes/occurrences.js');
const operations_managers = require('./routes/operations_managers.js');
const task_force = require('./routes/task_force.js');
const testimonials = require('./routes/testimonials.js');


app.use('/', index);
app.use('/users', users);
app.use('/requests',requests);
app.use('/auditors',auditors);
app.use('/audits',audits);
app.use('/inventory',inventory);
app.use('/collaborators',collaborators);
app.use('/occurrences',occurrences);
app.use('/operations_managers',operations_managers);
app.use('/task_force',task_force);
app.use('/testimonials',testimonials);


module.exports = app;















