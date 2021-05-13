const logger = require('../logger');
const { users: usersService } = require('../services');

const createUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const userCreated = await usersService.signUp(user);
    return res.status(200).send(userCreated);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  createUser
};
