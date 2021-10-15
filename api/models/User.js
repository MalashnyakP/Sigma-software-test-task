const { Schema, model } = require('mongoose');

const { dbTableEnum: { USER }, userRolesEnum } = require('../configs');
const { passwordService } = require('../services');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true });

userSchema.statics = {
    async createUserWithHashPass(user) {
        const hashPassword = await passwordService.hash(user.password);

        return this.create({ ...user, password: hashPassword });
    }
};

const User = model(USER, userSchema);

module.exports = User;
