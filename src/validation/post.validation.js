const Joi = require("joi");

const postValidationSchema = Joi.object({
  message: Joi.string().min(2).max(500).required().messages({
    "string.empty": "Le message est obligatoire",
    "string.min": "Le message doit contenir au moins 2 caractères",
    "string.max": "Le message ne peut pas dépasser 500 caractères",
  }),
});

module.exports = postValidationSchema;
