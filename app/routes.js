// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getQuote } = require('./controllers/weets');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getQuote);
};
