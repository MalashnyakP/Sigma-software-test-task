const {
    constants: { BODY },
    errors: { CONFLICT: { USER_CONFLICT, USER_ROLE_CONFLICT }, NOT_FOUND: { USER_NF }, BAD_REQUEST: { VALIDATION } },
} = require('../configs');
const { ErrorHandler } = require('../ErrorHandler');
const { User } = require('../models');
const { userValidator } = require('../validators');

module.exports = {
    validateDataDynamic: (validatorName, dataIn = BODY) => (req, res, next) => {
        try {
            const { error, value } = userValidator[validatorName].validate(req[dataIn]);

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

    doesUserExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                const { status_code, custom_code, message } = USER_NF;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    doesUserNotExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                const { status_code, custom_code, message } = USER_CONFLICT;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roles = []) => (req, res, next) => {
        try {
            const { role } = req.current_user;

            if (!roles.length) {
                return next();
            }

            if (!roles.includes(role)) {
                const { status_code, custom_code, message } = USER_ROLE_CONFLICT;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByParam: (paramName, searchIn = BODY, dbField = paramName) => async (req, res, next) => {
        try {
            const searchValue = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: searchValue });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
