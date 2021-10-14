const { Schema, model } = require('mongoose');

const { dbTableEnum: { OAUTH, USER } } = require('../configs');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

const OAuth = model(OAUTH, OAuthSchema);

module.exports = OAuth;
