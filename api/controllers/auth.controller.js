const {
    constants: { AUTHORIZATION }, statusCodes: { CREATED, NO_CONTENT }
} = require('../configs');
const { OAuth, User } = require('../models');
const { jwtService, passwordService } = require('../services');
const { userUtil } = require('../utils');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const user = await User.createUserWithHashPass(req.body);

            res.status(CREATED).json({ user: userUtil.userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    },

    logIn: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user: userUtil.userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.status(NO_CONTENT).json('User loged out successfully.');
            next();
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const { current_user } = req;

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.findOneAndUpdate({ refresh_token }, tokenPair);

            res.json({ ...tokenPair, user: userUtil.userNormalizator(current_user) });
            next();
        } catch (e) {
            next(e);
        }
    },
};
