const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.GEEK_JOKE_ERROR = 'geek_joke_error';
exports.geekJokeError = message => internalError(message, exports.GEEK_JOKE_ERROR);

exports.BAD_REQUEST = 'validation_error';
exports.badRequestError = message => internalError(message, exports.BAD_REQUEST);
