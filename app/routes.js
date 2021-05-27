const { healthCheck } = require('./controllers/healthCheck');
const { createUser, signIn } = require('./controllers/users');
const { encryptPassword, formatInputBody } = require('./middlewares/users');
const { validateSchema } = require('./middlewares/validateData');
const { CreateUserSchema, UserCredentials } = require('./schemas');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(CreateUserSchema), encryptPassword, formatInputBody, createUser);
  app.post('/users/sessions', validateSchema(UserCredentials), formatInputBody, signIn);
};
