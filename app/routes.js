const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/users');
const { validateEmail, validatePassword, formatInputBody } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', formatInputBody, validatePassword, validateEmail, createUser);
};
