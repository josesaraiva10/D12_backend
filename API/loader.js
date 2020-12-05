const app = require('./app.js');
const router = require('./routes/mainroutes.js');


const index = require('./routes/index.js');
const users = require('./routes/users.js');
const requests = require('./routes/requests.js');
const auditors = require('./routes/auditors.js');
const audits = require('./routes/audits.js');
const inventory = require('./routes/inventory.js');
const collaborators = require('./routes/collaborators.js');
const ocurrences = require('./routes/ocurrences.js');
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
app.use('/ocurrences',ocurrences);
app.use('/operations_managers',operations_managers);
app.use('/task_force',task_force);
app.use('/testimonials',testimonials);























