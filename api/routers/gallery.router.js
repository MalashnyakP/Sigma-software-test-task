const router = require('express').Router();

const {
    constants: { PARAMS }, dbFieldsEnum: { ID }, paramsNameEnum: { GALLERY_ID },
    validatorsEnum: { GALLERY_ID_VALIDATOR, UPDATE_GALLERY }
} = require('../configs');
const { galleryController } = require('../controllers');
const { authMiddleware: { checkToken }, galleryMiddleware } = require('../middlewares');

router.use(`/:${GALLERY_ID}`,
    galleryMiddleware.validateDataDynamic(GALLERY_ID, PARAMS),
    galleryMiddleware.getGalleryByParam(GALLERY_ID, PARAMS, ID),
    galleryMiddleware.doesGalleryExists);

router.get(`/:${GALLERY_ID}`,
    galleryController.getGalleryById);

router.put(`/:${GALLERY_ID}`,
    galleryMiddleware.validateDataDynamic(UPDATE_GALLERY),
    checkToken(),
    galleryController.updateGallery);

router.delete(`/:${GALLERY_ID}`,
    galleryMiddleware.validateDataDynamic(GALLERY_ID_VALIDATOR, PARAMS),
    checkToken(),
    galleryController.deleteGallery);

module.exports = router;
