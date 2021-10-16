const router = require('express').Router();

const {
    constants: { BODY },
    dbFieldsEnum: { ID },
    paramsNameEnum: { ART_ID }
} = require('../configs');
const { basketController } = require('../controllers');
const {
    authMiddleware: { checkToken },
    artPieceMiddleware: { doesArtExists, getArtByParam }
} = require('../middlewares');

router.get('/',
    checkToken(),
    basketController.getBacketByUserId);

router.post('/',
    checkToken(),
    basketController.createUserBacket);

router.put('/add',
    checkToken(),
    getArtByParam(ART_ID, BODY, ID),
    doesArtExists,
    basketController.addItemToBasket);

router.put('/remove',
    checkToken(),
    getArtByParam(ART_ID, BODY, ID),
    doesArtExists,
    basketController.removeItemFromBasket);

module.exports = router;
