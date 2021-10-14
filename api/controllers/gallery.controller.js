const { statusCodes: { CREATED } } = require('../configs');
const { Gallery } = require('../models');

module.exports = {
    createGallery: async (req, res, next) => {
        try {
            const gallery = await Gallery.create(req.body);

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
