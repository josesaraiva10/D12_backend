const app = require('./app.js');
const router = require('./routes/mainroutes.js');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require ('express-session');
const expressSanitizer = require ('express-sanitizer');
const bodyParser = require('body-parser');
const models = require("./models/");
const expressValidator = require('express-validator');


//Adicionar o validator ao middleware
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
app.use(cookieParser());

app.set('trust proxy', 1);
app.use(session({
  secret: 'webbookfca',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000,
    httpOnly: true,
  }
}));
//obriga a utilizar as cookies
app.use(function(req, res, next) {
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
    }
    else { // yes, cookie was already present
        console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});

app.use(expressValidator());
app.use(function(req, res, next) {
  // check if session exists
  if (global.sessData === undefined) {
    global.sessData = req.session;
    global.sessData.ID = req.sessionID;
  }
  else { // yes, cookie was already present
    console.log('session exists', global.sessData.ID);
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./routes/auth.route.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then( function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});


//loader calls all routes

const index = require('./routes/index.js');
const requests = require('./routes/requests.js');
const users = require('./routes/users.js');
const auditors = require('./routes/auditors.js');
const audits = require('./routes/audits.js');
const inventory = require('./routes/inventory.js');
const complainers = require('./routes/complainers.js');
const collaborators = require('./routes/collaborators.js');
const occurrences = require('./routes/occurrences.js');
const operation_managers = require('./routes/operation_managers.js');
const task_force = require('./routes/task_force.js');
const testimonials = require('./routes/testimonials.js');
const faqs = require('./routes/faqs.js');
const services = require('./routes/services.js');


app.use('/', index);
app.use('/users', users);
app.use('/requests', requests);
app.use('/auditors', auditors);
app.use('/audits', audits);
app.use('/inventory', inventory);
app.use('/collaborators', collaborators);
app.use('/occurrences', occurrences);
app.use('/complainers', complainers);
app.use('/operation_managers', operation_managers);
app.use('/task_force', task_force);
app.use('/testimonials', testimonials);
app.use('/faqs', faqs);
app.use('/services', services);


module.exports = app;
