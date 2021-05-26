const { badRequestError } = require('../errors');
/**
 * Options for validate schemas.
 */
const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateSchema = (schema, source = 'body') => (req, res, next) => {
  const { value, error } = schema.validate(req[source], options);
  if (error) {
    const errorMessages = error.details.map(errorDetail => errorDetail.message);
    throw badRequestError(errorMessages.length === 1 ? errorMessages[0] : errorMessages);
  }
  req[source] = value;
  return next();
};

module.exports = {
  validateSchema
};
