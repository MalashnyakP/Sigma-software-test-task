const bcrypt = require('bcrypt');

const ErrorHandler = require('../ErrorHandler');
const { errors: { BAD_REQUEST: { LOG_IN } } } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatches) {
            const { status_code, custom_code, message } = LOG_IN;
            throw new ErrorHandler(status_code, custom_code, message);
        }
    },

};
