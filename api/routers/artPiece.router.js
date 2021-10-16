const router = require('express').Router();

const {
    constants: { PARAMS }, dbFieldsEnum: { ID }, paramsNameEnum: { ART_ID },
    validatorsEnum: { ART_ID_VALIDATOR, UPDATE_ART_PIECE }
} = require('../configs');
const { artPieceController } = require('../controllers');
const { authMiddleware: { checkToken }, artPieceMiddleware } = require('../middlewares');

router.get('', artPieceController.getAllArtPieces);

router.use(`/:${ART_ID}`,
    artPieceMiddleware.validateDataDynamic(ART_ID_VALIDATOR, PARAMS),
    artPieceMiddleware.getArtByParam(ART_ID, PARAMS, ID),
    artPieceMiddleware.doesArtExists);

router.get(`/:${ART_ID}`,
    artPieceController.getArtPieceById);

router.put(`/:${ART_ID}`,
    artPieceMiddleware.validateDataDynamic(UPDATE_ART_PIECE),
    checkToken(),
    artPieceController.updateArtPiece);

router.delete(`/:${ART_ID}`,
    artPieceMiddleware.validateDataDynamic(ART_ID_VALIDATOR, PARAMS),
    checkToken(),
    artPieceController.deleteArtPiece);

module.exports = router;
