const Joi = require("joi");

const registerValidationSchema = Joi.object({
  pseudo: Joi.string().min(3).max(55).required().messages({
    "string.empty": "Le pseudo est obligatoire",
    "string.min": "Le pseudo doit contenir au moins 3 caractères",
    "string.max": "Le pseudo ne peut pas dépasser 55 caractères",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "L'email doit être une adresse valide",
    "string.empty": "L'email est obligatoire",
  }),

  password: Joi.string().min(6).max(1024).required().messages({
    "string.empty": "Le mot de passe est obligatoire",
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "L'email doit être une adresse valide",
      "string.empty": "L'email est obligatoire",
      "any.required": "L'email est requis",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Le mot de passe est obligatoire",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
      "any.required": "Le mot de passe est requis",
    }),
});

module.exports = {registerValidationSchema, loginValidationSchema};
