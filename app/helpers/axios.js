const axios = require('axios');

const config = require('../../config').external.geekJokeApi;

const geekJoke = axios.create({
  baseURL: config.url,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

module.exports = {
  geekJoke
};
