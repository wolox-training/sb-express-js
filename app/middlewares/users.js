const bcrypt = require('bcryptjs');
const { verify } = require('jsonwebtoken');

const logger = require('../logger');
const {
  session: { secret }
} = require('../../config').common;

const { snakeCaseObjectToCamelCase } = require('../helpers');
const { badRequestError } = require('../errors');

const formatInputBody = (req, res, next) => {
  try {
    req.body = snakeCaseObjectToCamelCase(req.body);
    return next();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const encryptPassword = (req, res, next) => {
  try {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    return next();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw badRequestError('Must send Authorization Bearer token');
    if (!token.startsWith('Bearer')) throw badRequestError('No Bearer token sended in the request');
    const decoded = verify(token.split(' ')[1], secret);
    req.locals = decoded;
    return next();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  formatInputBody,
  encryptPassword,
  isLoggedIn
};
