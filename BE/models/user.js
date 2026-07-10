const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    city: {type: String},
    country: {type: String},
    password: {type: String, required: true},
    role: {type: String, required: true, default: "user"},
    avatar: {
        link: { type: String },
        id: { type: String }
    },
    otp: {type: String},
    otpExpiration: {type: Date},
    isActived: {type: Boolean, default: true}
})

const User = mongoose.model('User', userSchema);

module.exports = User;