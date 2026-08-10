const mongoose = require('mongoose');

const permanentUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    otpExpiration: { type: Date, required: true },
    createAt: { type: Date, default: Date.now }
});

permanentUserSchema.index({ createAt: 1 },
    { expireAfterSeconds: 600 }
);

const PermanentUser = mongoose.model('PermanentUser', permanentUserSchema);

module.exports = PermanentUser;