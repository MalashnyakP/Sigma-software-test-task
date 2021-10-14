module.exports = {
    AUTHORIZATION: 'Authorization',

    ACCESS: 'access',
    REFRESH: 'refresh',

    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEX: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    MONGO_BD_ID_REGEX: new RegExp(/^[0-9a-fA-F]{24}$/),

    BODY: 'body',
    PARAMS: 'params',
    QUERY: 'query',
};
