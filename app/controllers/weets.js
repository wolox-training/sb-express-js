const logger = require('../logger');
const { weets: weetsService } = require('../services');

const getQuote = async (req, res, next) => {
  try {
    const quote = await weetsService.getRandomQuote();
    return res.status(200).send(quote);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  getQuote
};
