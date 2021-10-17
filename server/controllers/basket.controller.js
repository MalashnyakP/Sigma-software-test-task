const { dbTableEnum: { USER } } = require('../configs');
const { Basket } = require('../models');

module.exports = {
    getBacketByUserId: async (req, res, next) => {
        try {
            const { current_user: { _id } } = req;
            const basket = await Basket.findOne({ [USER]: _id });

            if (!basket) {
                res.json([]);
            }

            res.json(basket);
        } catch (e) {
            next(e);
        }
    },

    createUserBacket: async (req, res, next) => {
        try {
            const { current_user: { _id } } = req;

            const basket = await Basket.create({ [USER]: _id });

            res.json(basket);
        } catch (e) {
            next(e);
        }
    },

    addItemToBasket: async (req, res, next) => {
        try {
            const { current_user: { _id }, body: { art_id } } = req;
            const basket = await Basket.findOneAndUpdate({ [USER]: _id },
                { $push: { art_pieces: art_id } }, { new: true });

            res.json(basket);
        } catch (e) {
            next(e);
        }
    },

    removeItemFromBasket: async (req, res, next) => {
        try {
            const { current_user: { _id }, body: { art_id } } = req;
            const basket = await Basket.findOneAndUpdate({ [USER]: _id, art_pieces: art_id },
                { $pull: { art_pieces: art_id } }, { multi: false, new: true });

            res.json(basket);
        } catch (e) {
            next(e);
        }
    },
};
