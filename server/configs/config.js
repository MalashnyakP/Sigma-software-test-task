module.exports = {
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/test_task',
    PORT: process.env.PORT || 5000,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000',

    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'us-east-2',
    AWS_S3_NAME: process.env.AWS_S3_NAME || 'sigma-test-task',
};
