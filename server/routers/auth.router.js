const router = require('express').Router();

const {
    constants: { REFRESH }, validatorsEnum: {
        CREATE_USER, LOG_IN_USER
    }
} = require('../configs');
const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post('/',
    userMiddleware.validateDataDynamic(LOG_IN_USER),
    userMiddleware.getUserByParam('email'),
    userMiddleware.doesUserExist,
    authController.logIn);

router.post('/signup',
    userMiddleware.validateDataDynamic(CREATE_USER),
    userMiddleware.getUserByParam('email'),
    userMiddleware.doesUserNotExist,
    authController.signUp);

router.post('/logout',
    authMiddleware.checkToken(),
    authController.logOut);

router.post('/refresh',
    authMiddleware.checkToken(REFRESH),
    authController.refreshToken);

module.exports = router;
