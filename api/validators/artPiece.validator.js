const Joi = require('joi');

const { constants: { CURRENT_YEAR, MONGO_BD_ID_REGEX }, dbTableEnum: { GALLERY } } = require('../configs');

module.exports = {
    createArtValidator: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3).max(30)
            .trim()
            .required(),

        price: Joi
            .number()
            .integer()
            .required(),

        year: Joi
            .number()
            .integer()
            .max(CURRENT_YEAR)
            .required(),

        art: Joi
            .string()
            .trim(),

        [GALLERY]: Joi
            .string()
            .trim()
            .regex(MONGO_BD_ID_REGEX)
    }),

    artIdValidator: Joi.object({
        art_id: Joi
            .string()
            .trim()
            .regex(MONGO_BD_ID_REGEX)
            .required()
    }),

    updateArtValidator: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3).max(30)
            .trim(),

        price: Joi
            .number()
            .integer(),

        year: Joi
            .number()
            .integer()
            .max(CURRENT_YEAR),

        art: Joi
            .string()
            .trim(),
    })
};
