const { healthCheck } = require('./controllers/healthCheck');
const { createUser, signIn, listUsers } = require('./controllers/users');
const { encryptPassword, formatInputBody, isLoggedIn } = require('./middlewares/users');
const { validateSchema } = require('./middlewares/validateData');
const { CreateUserSchema, UserCredentials, PaginationParams } = require('./schemas');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(CreateUserSchema), encryptPassword, formatInputBody, createUser);
  app.post('/users/sessions', validateSchema(UserCredentials), formatInputBody, signIn);
  app.get('/users', validateSchema(PaginationParams, 'query'), isLoggedIn, listUsers);
};
