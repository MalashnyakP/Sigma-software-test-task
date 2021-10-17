const {
    constants: { ACCESS, AUTHORIZATION },
    errors: { UNAUTHORIZED: { INVALID_TOKEN } }
} = require('../configs');
const { ErrorHandler } = require('../ErrorHandler');
const { jwtService } = require('../services');
const { User } = require('../models');

module.exports = {
    checkToken: (tokenType = ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                const { status_code, custom_code, message } = INVALID_TOKEN;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            const { user_id } = await jwtService.verifyToken(token, tokenType);

            const current_user = await User.findOne({ _id: user_id });

            if (!current_user) {
                const { status_code, custom_code, message } = INVALID_TOKEN;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            req.current_user = current_user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
