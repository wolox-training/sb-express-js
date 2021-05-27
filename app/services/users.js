const logger = require('../logger');
const { databaseError } = require('../errors');
const { users: User } = require('../models');

const defaultUserAttributes = ['id', 'name', 'lastName', 'email', 'createdAt', 'updatedAt'];

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

const getUsers = async (limit, offset, condition, attributes = defaultUserAttributes) => {
  try {
    const users = await User.findAll({
      limit,
      offset,
      where: condition,
      attributes,
      raw: true
    });
    return users;
  } catch (error) {
    logger.error(error);
    throw databaseError('Cannot get the list of users');
  }
};

module.exports = {
  signUp,
  getUser,
  getUsers
};
