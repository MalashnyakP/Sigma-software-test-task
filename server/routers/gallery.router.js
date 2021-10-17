const router = require('express').Router();

const {
    constants: { PARAMS }, dbFieldsEnum: { ID }, paramsNameEnum: { GALLERY_ID },
    userRolesEnum: { OWNER },
    validatorsEnum: { GALLERY_ID_VALIDATOR, UPDATE_GALLERY }
} = require('../configs');
const { galleryController } = require('../controllers');
const { authMiddleware: { checkToken }, galleryMiddleware, userMiddleware } = require('../middlewares');

router.get('/user',
    checkToken(),
    userMiddleware.checkUserRole(OWNER),
    galleryController.getUserGallery);

router.use(`/:${GALLERY_ID}`,
    galleryMiddleware.validateDataDynamic(GALLERY_ID_VALIDATOR, PARAMS),
    galleryMiddleware.getGalleryByParam(GALLERY_ID, PARAMS, ID),
    galleryMiddleware.doesGalleryExists);

router.get(`/:${GALLERY_ID}`,
    galleryController.getGalleryById);

router.put(`/:${GALLERY_ID}`,
    galleryMiddleware.validateDataDynamic(UPDATE_GALLERY),
    checkToken(),
    userMiddleware.checkUserRole(OWNER),
    galleryController.updateGallery);

router.delete(`/:${GALLERY_ID}`,
    galleryMiddleware.validateDataDynamic(GALLERY_ID_VALIDATOR, PARAMS),
    checkToken(),
    userMiddleware.checkUserRole(OWNER),
    galleryController.deleteGallery);

module.exports = router;
