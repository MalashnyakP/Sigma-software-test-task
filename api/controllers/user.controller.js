const { User } = require('../models');
const { userUtil } = require('../utils');

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.findByIdAndDelete(user_id);

            res.json({ message: 'User deleted succesfully.' });
        } catch (e) {
            next(e);
        }
    },

    getCurrentUser: (req, res, next) => {
        try {
            const { current_user } = req;

            res.json(userUtil.userNormalizator(current_user));
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { ...userData } = req.body;

            const updatedUser = await User.findByIdAndUpdate({ _id: user_id }, { ...userData }, { new: true });

            res.json(userUtil.userNormalizator(updatedUser));
        } catch (e) {
            next(e);
        }
    }
};
