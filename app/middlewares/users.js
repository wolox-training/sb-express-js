const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { badRequestError } = require('../errors');
const { snakeCaseObjectToCamelCase } = require('../helpers');

const formatInputBody = (req, res, next) => {
  try {
    req.body = snakeCaseObjectToCamelCase(req.body);
    return next();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const woloxEmailPattern = /^[^_\W]+\.[^_\W]+@wolox(.com)?.(co|me|cl|ar)$/gi;
    const matchPattern = woloxEmailPattern.test(email);
    if (matchPattern) return next();
    throw badRequestError('Email entered does not comply with the Wolox emails format');
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body;
    const woloxPasswordPattern = /^[^_\W]{8,}$/gi;
    const matchPattern = woloxPasswordPattern.test(password);
    if (matchPattern) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
      return next();
    }
    throw badRequestError('The password must have a minimum of 8 alphanumeric characters');
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  validateEmail,
  formatInputBody,
  validatePassword
};
