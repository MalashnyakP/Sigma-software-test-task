const Joi = require('joi');

const { constants: { MONGO_BD_ID_REGEX }, dbTableEnum: { USER } } = require('../configs');

module.exports = {
    createGalleryValidator: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3).max(30)
            .trim()
            .required(),

        location: Joi
            .string()
            .alphanum()
            .min(8).max(50)
            .required(),

        [USER]: Joi
            .string()
            .trim()
            .regex(MONGO_BD_ID_REGEX)
            .required()
    }),

    galleryIdValidator: Joi.object({
        gallery_id: Joi
            .string()
            .trim()
            .regex(MONGO_BD_ID_REGEX)
            .required()
    }),

    updateGalleryValidator: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3).max(30)
            .trim(),

        location: Joi
            .string()
            .alphanum()
            .min(8).max(50)
    })
};
