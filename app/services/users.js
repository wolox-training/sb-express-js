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

const getUser = async condition => {
  try {
    const user = await User.findOne({
      where: condition
    });
    return user;
  } catch (error) {
    logger.error(error);
    throw databaseError('Cannot get user');
  }
};

module.exports = {
  signUp,
  getUser
};
