const router = require('express').Router();

const {
    constants: { PARAMS }, dbFieldsEnum: { ID }, paramsNameEnum: { USER_ID },
    validatorsEnum: { USER_ID_VALIDATOR, UPDATE_USER }
} = require('../configs');
const { userController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.use(`/:${USER_ID}`,
    userMiddleware.validateDataDynamic(USER_ID_VALIDATOR, PARAMS),
    userMiddleware.getUserByParam(USER_ID, PARAMS, ID),
    userMiddleware.doesUserExist);

router.get(`/:${USER_ID}`,
    userController.getUserById);

router.put(`/:${USER_ID}`,
    userMiddleware.validateDataDynamic(UPDATE_USER),
    authMiddleware.checkToken(),
    userController.updateUser);

router.delete(`/:${USER_ID}`,
    userMiddleware.validateDataDynamic(USER_ID_VALIDATOR, PARAMS),
    authMiddleware.checkToken(),
    userController.deleteUser);

module.exports = router;
