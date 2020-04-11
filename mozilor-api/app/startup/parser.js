const express = require('express');

// configure the app to use bodyParser()

module.exports = (app) => {
  app.use(express.json());
};
