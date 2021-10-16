const { dbTableEnum: { ART_PIECE, GALLERY }, statusCodes: { CREATED } } = require('../configs');
const { ArtPiece } = require('../models');
const { artPieceSerice: { artPiecesSearchQuery }, s3Service } = require('../services');

module.exports = {
    createArtPiece: async (req, res, next) => {
        try {
            const {
                name, price, year, gallery
            } = req.body;

            let art_piece = await ArtPiece.create({
                name, price, year, [GALLERY]: gallery
            });

            console.log(req.art);
            console.log(req.files);
            if (req.files && req.files.art) {
                const { art } = req.files;

                const imgLocation = await s3Service.upload(art, ART_PIECE, art_piece._id.toString());

                art_piece = await ArtPiece.findByIdAndUpdate(art_piece._id, { art: imgLocation }, { new: true });
            }
            res.status(CREATED).json(art_piece);
        } catch (e) {
            next(e);
        }
    },

    deleteArtPiece: async (req, res, next) => {
        try {
            const { art_id } = req.params;

            await ArtPiece.findByIdAndDelete(art_id);

            res.json({ message: 'Art piece deleted succesfully.' });
        } catch (e) {
            next(e);
        }
    },

    getAllArtPieces: async (req, res, next) => {
        try {
            const artPieces = await artPiecesSearchQuery(req.query);

            res.json(artPieces);
        } catch (e) {
            next(e);
        }
    },

    getArtPieceById: (req, res, next) => {
        try {
            const { art_piece } = req;

            res.json(art_piece);
        } catch (e) {
            next(e);
        }
    },

    updateArtPiece: async (req, res, next) => {
        try {
            const { art_id } = req.params;
            const { ...artPieceData } = req.body;

            const updatedArt = await ArtPiece.findByIdAndUpdate({ _id: art_id }, { ...artPieceData }, { new: true });

            res.json(updatedArt);
        } catch (e) {
            next(e);
        }
    },

};
