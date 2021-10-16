const {
    dbTableEnum: { USER },
    errors: { NOT_FOUND: { GALLERY_NF } }, statusCodes: { CREATED }
} = require('../configs');
const { Gallery } = require('../models');
const { ErrorHandler } = require('../ErrorHandler');

module.exports = {
    createGallery: async (req, res, next) => {
        try {
            const { body: { name, location }, current_user } = req;
            const gallery = await Gallery.create({ name, location, [USER]: current_user._id });

            res.status(CREATED).json(gallery);
        } catch (e) {
            next(e);
        }
    },

    deleteGallery: async (req, res, next) => {
        try {
            const { gallery_id } = req.params;

            await Gallery.findByIdAndDelete(gallery_id);

            res.json({ message: 'Gallery deleted succesfully.' });
        } catch (e) {
            next(e);
        }
    },

    getGalleryById: (req, res, next) => {
        try {
            const { gallery } = req;

            res.json(gallery);
        } catch (e) {
            next(e);
        }
    },

    getUserGallery: async (req, res, next) => {
        try {
            const { current_user } = req;

            const gallery = await Gallery.find({ [USER]: current_user._id });

            if (!gallery) {
                const { status_code, custom_code, message } = GALLERY_NF;
                throw new ErrorHandler(status_code, custom_code, message);
            }

            res.json(gallery);
            next();
        } catch (e) {
            next(e);
        }
    },

    updateGallery: async (req, res, next) => {
        try {
            const { gallery_id } = req.params;
            const { ...galleryData } = req.body;

            const updatedGallery = await Gallery.findByIdAndUpdate({ _id: gallery_id }, { ...galleryData }, { new: true });

            res.json(updatedGallery);
        } catch (e) {
            next(e);
        }
    },
};
