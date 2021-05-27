const { isJSON } = require('./json');

const camelCaseKeytoSnakeCase = str => str.replace(/[A-Z]/g, $1 => `_${$1.toLowerCase()}`);
const snakeCaseKeytoCamelCase = str => str.replace(/(_[a-z])/g, $1 => $1.toUpperCase().replace('_', ''));

const generalCaseConverter = (element, singleConverterFunction) => {
  if (Array.isArray(element)) {
    return element.map(object => generalCaseConverter(object, singleConverterFunction));
  } else if (isJSON(element)) {
    const formattetObject = {};
    Object.keys(element).forEach(key => {
      formattetObject[singleConverterFunction(key)] = generalCaseConverter(
        element[key],
        singleConverterFunction
      );
    });
    return formattetObject;
  }
  return element;
};

const camelCaseObjectToSnakeCase = element => generalCaseConverter(element, camelCaseKeytoSnakeCase);
const snakeCaseObjectToCamelCase = element => generalCaseConverter(element, snakeCaseKeytoCamelCase);

module.exports = {
  camelCaseObjectToSnakeCase,
  snakeCaseObjectToCamelCase
};
