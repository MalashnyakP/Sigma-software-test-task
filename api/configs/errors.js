const statusCodes = require('./statusCodes.enum');

module.exports = {
    BAD_REQUEST: {
        FILE_SIZE: {
            message: 'File size is too big.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.8'
        },

        LOG_IN: {
            message: 'Email or password is wrong.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.9'
        },

        NOT_OWNED_BY_USER: {
            message: 'This car isn\'t owned by this user.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.6'
        },

        PASSWORDS_DONT_MATCH: {
            message: 'Passwords don\'t match.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.3'
        },

        PASSWORD_SAME_AS_OLD_ONE: {
            message: 'Password same as old one.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.2'
        },

        VALIDATION: {
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.5'
        },

        WRONG_FILE_FORMAT: {
            message: 'File has wrong format.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.7'
        },

        WRONG_TEMPLATE: {
            message: 'Wrong email template.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.9'
        }
    },

    CONFLICT: {
        USER_CONFLICT: {
            message: 'User with this email already exists.',
            status_code: statusCodes.CONFLICT,
            custom_code: '409.1'
        },
    },

    FORBIDDEN: {
        USER_ACTIVE: {
            message: 'User not activated.',
            status_code: statusCodes.FORBIDDEN,
            custom_code: '403.2'
        },
        USER_FORBIDDEN: {
            message: 'This user role forbiden from this action.',
            status_code: statusCodes.FORBIDDEN,
            custom_code: '403.1'
        },

    },

    UNAUTHORIZED: {
        INVALID_TOKEN: {
            message: 'Invalid token.',
            status_code: statusCodes.UNA,
            custom_code: '401.1'
        }
    },

    NOT_FOUND: {
        CAR_NF: {
            message: 'No car found.',
            status_code: statusCodes.NOT_FOUND,
            custom_code: '404.2'
        },

        USER_NF: {
            message: 'No user found.',
            status_code: statusCodes.NOT_FOUND,
            custom_code: '404.1'
        },
    }
};
