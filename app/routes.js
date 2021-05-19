// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/users');
const { validateEmail, validatePassword } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validatePassword, validateEmail, createUser);
};
