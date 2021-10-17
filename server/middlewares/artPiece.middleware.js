const {
    constants: { BODY },
    errors: { BAD_REQUEST: { VALIDATION }, NOT_FOUND: { ART_PIECE_NF } }
} = require('../configs');
const { ErrorHandler } = require('../ErrorHandler');
const { ArtPiece } = require('../models');
const { artPieceValidator } = require('../validators');

module.exports = {
    doesArtExists: (req, res, next) => {
        const { art_piece } = req;

        if (!art_piece) {
            const { status_code, custom_code, message } = ART_PIECE_NF;
            throw new ErrorHandler(status_code, custom_code, message);
        }

        next();
    },

    getArtByParam: (paramName, searchIn = BODY, dbField = paramName) => async (req, res, next) => {
        try {
            const searchValue = req[searchIn][paramName];

            const art_piece = await ArtPiece.findOne({ [dbField]: searchValue });

            req.art_piece = art_piece;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (validatorName, dataIn = BODY) => (req, res, next) => {
        try {
            const { error, value } = artPieceValidator[validatorName].validate(req[dataIn]);

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
