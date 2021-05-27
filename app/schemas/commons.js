const Joi = require('joi');
const { maxPageSize } = require('../../config').common.api;

const PaginationParams = Joi.object({
  page: Joi.number().min(0),
  size: Joi.number()
    .min(1)
    .max(maxPageSize)
});

module.exports = {
  PaginationParams
};
