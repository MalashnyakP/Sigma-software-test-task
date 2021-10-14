class ErrorHandler extends Error {
    constructor(status_code, custom_code, message = '', data = '') {
        super(message);
        this.status_code = status_code;
        this.custom_code = custom_code;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
