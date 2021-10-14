const {
    constants: { ACCESS, AUTHORIZATION },
    dbTableEnum: { USER },
    errors: { UNAUTHORIZED: { INVALID_TOKEN } }
} = require('../configs');
const { ErrorHandler } = require('../ErrorHandler');
const { jwtService } = require('../services');
const { OAuth } = require('../models');

module.exports = {
    checkToken: (tokenType = ACCESS, tokenDB = OAuth) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                const { status_code, custom_code, message } = INVALID_TOKEN;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            await jwtService.verifyToken(token, tokenType);

            const DBField = `${tokenType}_token`;

            const tokenFromDb = await tokenDB.findOne({ [DBField]: token }).populate(USER);

            if (!tokenFromDb) {
                const { status_code, custom_code, message } = INVALID_TOKEN;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            req.current_user = tokenFromDb.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
