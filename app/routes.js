const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/users');
const { encryptPassword, formatInputBody } = require('./middlewares/users');
const { validateSchema } = require('./middlewares/validateData');
const { CreateUserSchema } = require('./schemas');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(CreateUserSchema), encryptPassword, formatInputBody, createUser);
};
