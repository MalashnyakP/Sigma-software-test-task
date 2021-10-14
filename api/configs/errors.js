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

        VALIDATION: {
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.5'
        },

        WRONG_FILE_FORMAT: {
            message: 'File has wrong format.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.7'
        },
    },

    CONFLICT: {
        GALLERY_CONFLICT: {
            message: 'Gallery with this name already exists.',
            status_code: statusCodes.CONFLICT,
            custom_code: '409.2'
        },
        USER_CONFLICT: {
            message: 'User with this email already exists.',
            status_code: statusCodes.CONFLICT,
            custom_code: '409.1'
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
        ART_PIECE_NF: {
            message: 'No art piece found.',
            status_code: statusCodes.NOT_FOUND,
            custom_code: '404.2'
        },

        GALLERY_NF: {
            message: 'No gallery found.',
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
