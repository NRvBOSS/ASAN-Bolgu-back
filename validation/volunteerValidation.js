const Joi = require("joi");

const volunteerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  gender: Joi.string().valid("man", "woman").required(),
});

module.exports = {
  volunteerValidationSchema,
};
