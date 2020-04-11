const express = require('express');
// const logger = require('morgan');

const app = express();

// app.use(logger('dev'));

require('./app/startup/dotenv')();
require('./app/startup/prod')(app);
require('./app/startup/parser')(app);
require('./app/startup/cors')(app);

require('./router')(app);

module.exports = app;