const logger = require('../logger');
const { geekJoke } = require('../helpers');
const { geekJokeError } = require('../errors');

const getRandomQuote = async () => {
  try {
    const randomQuote = await geekJoke.get();
    return randomQuote.data;
  } catch (error) {
    logger.error(error);
    throw geekJokeError('Cannot get quote');
  }
};

module.exports = {
  getRandomQuote
};
