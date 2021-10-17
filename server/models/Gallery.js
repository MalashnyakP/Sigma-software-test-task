const { Schema, model } = require('mongoose');

const { dbTableEnum: { GALLERY, USER } } = require('../configs');

const gallerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

gallerySchema.pre('findOne', function() {
    this.populate(USER);
});

const Gallery = model(GALLERY, gallerySchema);

module.exports = Gallery;
