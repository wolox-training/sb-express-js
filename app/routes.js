// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getQuote } = require('./controllers/weets');
const { createUser } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getQuote);
  app.post('/users', createUser);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
