const jwt = require('jsonwebtoken');
const moment = require('moment');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const config = require('../config/config.json');

module.exports = (roles = []) => [
  (req, res, next) => {
    const jwtToken = config.jwtPrivateTtoken.token;
    const token = req.headers.authorization;
    if (!token) return res.status(HttpStatus.UNAUTHORIZED).send('Access denied. No token provided.');
    try {
      const decoded = jwt.verify(req.headers.authorization, jwtToken);
      if (_.includes(roles, decoded.roleId)) {
        if (decoded.exp < moment().unix(moment())) return res.status(HttpStatus.UNAUTHORIZED).send('Time Expired. Login to continue');
        next();
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized access');
      }
    } catch (ex) {
      res.status(HttpStatus.BAD_REQUEST).send('Invalid token!.');
    }
  },
];
