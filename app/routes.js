// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getQuote } = require('./controllers/weets');
const { createUser } = require('./controllers/users');
const { validateEmail, validatePassword } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getQuote);
  app.post('/users', validatePassword, validateEmail, createUser);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
