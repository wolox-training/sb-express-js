const bcrypt = require('bcryptjs');
const logger = require('../logger');
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

module.exports = {
  formatInputBody,
  encryptPassword
};
