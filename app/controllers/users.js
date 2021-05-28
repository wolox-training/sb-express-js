const logger = require('../logger');
const { databaseError } = require('../errors');
const { users: usersService } = require('../services');
const { camelCaseObjectToSnakeCase } = require('../helpers');

const createUser = async ({ body: user }, res, next) => {
  try {
    const { name, email } = user;

    const userExists = await usersService.getUser({ email });
    if (userExists) throw databaseError(`User with email '${email}' already exists`);

    logger.info(`Starting user creation with email ${email}`);
    const userCreated = await usersService.signUp(user);
    delete userCreated.password;

    logger.info(`User ${name} was created successfully`);
    return res.status(200).send(camelCaseObjectToSnakeCase(userCreated));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  createUser
};
