const mung = require('express-mung');
const logger = require('../helpers/logger.helper');

module.exports = (app) => {
  // middleware to intercept the request object.
  app.use(logger.requestLogger);
  // middleware to access response body object.
  app.use(mung.json((body, req, res) => {
    logger.responseLogger(body, req, res);
    return body;
  }));
};
