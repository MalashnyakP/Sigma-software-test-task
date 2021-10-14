module.exports = {
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/test_task',
    PORT: process.env.PORT || 5000,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000',

    EMAIL_NAME_CREDENTIAL: process.env.EMAIL_NAME_CREDENTIAL,
    EMAIL_PASS_CREDENTIAL: process.env.EMAIL_PASS_CREDENTIAL,
};
