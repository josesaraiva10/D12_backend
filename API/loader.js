const app = require('./app.js');
const router = require('./routes/mainroutes.js');

//Routes
const index = require('./routes/index');
const users = require('./routes/users');
const requests = require('./routes/requests');
const auditors = require('./routes/auditors');
const audits = require('./routes/audits');
const inventory = require('./routes/inventory');
const collaborators = require('./routes/collaborators');
const ocurrences = require('./routes/ocurrences');
const operations_managers = require('./routes/operations_managers');
const task_force = require('./routes/task_force');
const testimonials = require('./routes/testimonials');


app.use('/', index);
app.use('/users', users);
app.use('/requests',requests);
app.use('/auditors',auditors);
app.use('/audits',audits);
app.use('/inventory',inventory);
app.use('/collaborators',collaborators);
app.use('/ocurrences',ocurrences);
app.use('/operations_managers',operations_managers);
app.use('/task_force',task_force);
app.use('/testimonials',testimonials);























