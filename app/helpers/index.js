const { isJSON } = require('./json');
const { geekJoke } = require('./axios');
const { camelCaseObjectToSnakeCase, snakeCaseObjectToCamelCase } = require('./caseConverter');

module.exports = {
  isJSON,
  geekJoke,
  camelCaseObjectToSnakeCase,
  snakeCaseObjectToCamelCase
};
