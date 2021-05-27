const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const logger = require('../logger');
const { secret, token_exp: tokenExp } = require('../../config').common.session;
const { databaseError, badRequestError } = require('../errors');
const { users: usersService } = require('../services');
const { camelCaseObjectToSnakeCase } = require('../helpers');

const createUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const { name, email } = user;

    const userExists = await usersService.getUser({ email });
    if (userExists) throw databaseError(`User with email '${email}' already exists`);
    const userCreated = await usersService.signUp(user);
    delete userCreated.password;
    logger.info(name);
    return res.status(200).send(camelCaseObjectToSnakeCase(userCreated));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { body: user } = req;
    const { email, password } = user;
    const userExists = await usersService.getUser({ email });

    if (!userExists) throw badRequestError('Email or password is wrong');
    const isCorrectPassword = await bcrypt.compare(password, userExists.password);
    if (!isCorrectPassword) throw badRequestError('Email or password is wrong');

    const token = sign({ sub: userExists.name }, secret, { expiresIn: tokenExp });
    logger.info(`${email} is logged`);
    return res.status(200).send({ token });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  signIn,
  createUser
};
