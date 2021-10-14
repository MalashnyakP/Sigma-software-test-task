const jwt = require('jsonwebtoken');

const {
    configs: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET },
    constants: { ACCESS, REFRESH },
    errors: { UNAUTHORIZED: { INVALID_TOKEN } }
} = require('../configs');
const { ErrorHandler } = require('../ErrorHandler');

module.exports = {
    generateTokenPair: (user_id) => {
        const access_token = jwt.sign({ user_id }, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refresh_token = jwt.sign({ user_id }, REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

        return { access_token, refresh_token };
    },

    verifyToken: (token, tokenType = ACCESS) => {
        try {
            let secretKey = ACCESS_TOKEN_SECRET;

            if (tokenType === REFRESH) {
                secretKey = REFRESH_TOKEN_SECRET;
            }

            return jwt.verify(token, secretKey);
        } catch (e) {
            const { status_code, custom_code, message } = INVALID_TOKEN;
            throw new ErrorHandler(status_code, custom_code, message);
        }
    }
};
