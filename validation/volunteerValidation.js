const Joi = require("@hapi/joi");

const volunteerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

module.exports = {
  volunteerValidationSchema,
};
