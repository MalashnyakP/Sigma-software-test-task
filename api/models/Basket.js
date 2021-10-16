const { Schema, model } = require('mongoose');

const { dbTableEnum: { BASKET, USER } } = require('../configs');

const backetSchema = new Schema({
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    },
    art_pieces: {
        type: Array,
        default: [],
        unique: true
    }
}, { timestamps: true });

backetSchema.pre('find', function() {
    this.populate(USER);
});

const Basket = model(BASKET, backetSchema);

module.exports = Basket;
