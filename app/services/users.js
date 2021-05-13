const logger = require('../logger');
const { databaseError } = require('../errors');
const { users: User } = require('../models');

const signUp = async user => {
  try {
    const createdUser = await User.create(user);
    return createdUser.toJSON();
  } catch (error) {
    logger.error(error);
    throw databaseError('Cannot create user');
  }
};

module.exports = {
  signUp
};
