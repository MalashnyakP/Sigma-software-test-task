const {
    constants: { BODY },
    errors: { BAD_REQUEST: { VALIDATION }, CONFLICT: { GALLERY_CONFLICT }, NOT_FOUND: { GALLERY_NF } }
} = require('../configs');
const { ErrorHandler } = require('../ErrorHandler');
const { Gallery } = require('../models');
const { galleryValidator } = require('../validators');

module.exports = {
    doesGalleryExists: (req, res, next) => {
        const { gallery } = req;

        if (!gallery) {
            const { status_code, custom_code, message } = GALLERY_NF;
            throw new ErrorHandler(status_code, custom_code, message);
        }

        next();
    },

    isGalleryNameAvailable: (req, res, next) => {
        try {
            const { gallery } = req;

            if (gallery) {
                const { status_code, custom_code, message } = GALLERY_CONFLICT;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getGalleryByParam: (paramName, searchIn = BODY, dbField = paramName) => async (req, res, next) => {
        try {
            const searchValue = req[searchIn][paramName];

            const gallery = await Gallery.findOne({ [dbField]: searchValue });

            req.gallery = gallery;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (validatorName, dataIn = BODY) => (req, res, next) => {
        try {
            const { error, value } = galleryValidator[validatorName].validate(req[dataIn]);

            if (error) {
                const { status_code, custom_code } = VALIDATION;
                throw new ErrorHandler(status_code, custom_code, error.details[0].message);
            }

            req[dataIn] = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
