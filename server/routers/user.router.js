const router = require('express').Router();

const {
    constants: { PARAMS }, dbFieldsEnum: { ID }, paramsNameEnum: { USER_ID },
    userRolesEnum: { OWNER },
    validatorsEnum: {
        CREATE_ART_PIECE, CREATE_GALLERY, USER_ID_VALIDATOR, UPDATE_USER
    }
} = require('../configs');
const { artPieceController, userController } = require('../controllers');
const galleryController = require('../controllers/gallery.controller');
const {
    artPieceMiddleware, authMiddleware, galleryMiddleware, userMiddleware
} = require('../middlewares');

router.post('/addArtPiece',
    artPieceMiddleware.validateDataDynamic(CREATE_ART_PIECE),
    authMiddleware.checkToken(),
    userMiddleware.checkUserRole(OWNER),
    artPieceController.createArtPiece);

router.post('/createGallery',
    galleryMiddleware.validateDataDynamic(CREATE_GALLERY),
    authMiddleware.checkToken(),
    galleryController.createGallery);

router.get('/',
    authMiddleware.checkToken(),
    userMiddleware.doesUserExist,
    userController.getCurrentUser);

router.put('/',
    userMiddleware.validateDataDynamic(UPDATE_USER),
    authMiddleware.checkToken(),
    userController.updateUser);

router.use(`/:${USER_ID}`,
    userMiddleware.validateDataDynamic(USER_ID_VALIDATOR, PARAMS),
    userMiddleware.getUserByParam(USER_ID, PARAMS, ID),
    userMiddleware.doesUserExist,
    authMiddleware.checkToken());

router.delete(`/:${USER_ID}`,
    userMiddleware.validateDataDynamic(USER_ID_VALIDATOR, PARAMS),
    userController.deleteUser);

module.exports = router;
