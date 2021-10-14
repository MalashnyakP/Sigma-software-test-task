const Joi = require('joi');

const { constants: { EMAIL_REGEX, PASSWORD_REGEX, MONGO_BD_ID_REGEX } } = require('../configs');

module.exports = {
    createUserValidator: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3).max(30)
            .trim()
            .required(),

        email: Joi
            .string()
            .trim()
            .regex(EMAIL_REGEX)
            .required(),

        password: Joi
            .string()
            .min(8).max(128)
            .trim()
            .regex(PASSWORD_REGEX)
            .required()
    }),

    logInUserValidator: Joi.object({
        email: Joi
            .string()
            .trim()
            .regex(EMAIL_REGEX)
            .required(),

        password: Joi
            .string()
            .trim()
            .min(8).max(128)
            .regex(PASSWORD_REGEX)
            .required()
    }),

    userEmailValidator: Joi.object({
        email: Joi
            .string()
            .trim()
            .regex(EMAIL_REGEX)
            .required()
    }),

    userIdValidator: Joi.object({
        user_id: Joi
            .string()
            .trim()
            .regex(MONGO_BD_ID_REGEX)
            .required()
    }),

    updateUserValidator: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3).max(30)
            .trim(),

        email: Joi
            .string()
            .trim()
            .regex(EMAIL_REGEX)
    })
};
