const logger = require('../logger');
const { databaseError } = require('../errors');
const { users: usersService } = require('../services');

const createUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const { name, email } = user;

    const userExists = await usersService.getUser({ email });
    if (userExists) throw databaseError(`User with email '${email}' already exists`);
    const userCreated = await usersService.signUp(user);
    delete userCreated.password;
    logger.info(name);
    return res.status(200).send(userCreated);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  createUser
};
