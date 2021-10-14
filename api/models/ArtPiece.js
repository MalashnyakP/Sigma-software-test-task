const { Schema, model } = require('mongoose');

const { dbTableEnum: { ART_PIECE, GALLERY } } = require('../configs');

const artPieceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    [GALLERY]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: GALLERY
    }
}, { timestamps: true });

artPieceSchema.pre('findOne', function() {
    this.populate(GALLERY);
});

const Gallery = model(ART_PIECE, artPieceSchema);

module.exports = Gallery;
