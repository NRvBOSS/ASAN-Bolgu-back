const Joi = require("joi");

const volunteerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  gender: Joi.string().valid("kişi", "qadın").required(),

  rest: Joi.string()
    .valid(
      "bazar ertəsi",
      "çərşənbə axşamı",
      "çərşənbə",
      "cümə axşamı",
      "cümə",
      "şənbə",
      "bazar"
    )
    .optional(), // istəsən göndər, istəməsən yox

  role: Joi.string()
    .valid("könüllü", "sorğu rəhbəri", "qrup rəhbəri", "digər", "Hüquq")
    .default("könüllü"),

  period: Joi.string().valid("1", "2", "3").required(),
});

module.exports = {
  volunteerValidationSchema,
};
