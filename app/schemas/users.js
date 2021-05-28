const Joi = require('joi');

const CreateUserSchema = Joi.object({
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .regex(/^[^_\W]+\.[^_\W]+@wolox(.com)?.(co|me|cl|ar)$/i)
    .required()
    .messages({
      'string.pattern.base': 'Email entered does not comply with the Wolox emails format'
    }),
  password: Joi.string()
    .regex(/^[^_\W]+$/i)
    .min(8)
    .required()
    .messages({
      'string.min': 'The password must have a minimum of 8 alphanumeric characters',
      'string.pattern.base': 'The password only allows alphanumeric characters'
    })
});

module.exports = {
  CreateUserSchema
};
