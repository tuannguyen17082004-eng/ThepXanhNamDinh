const UserModel = require('../models/user');
const PermanentUserModel = require('../models/permanentUser');

module.exports.checkOTP = async (email, otp) => {
    try {
        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await PermanentUserModel.findOne({ email });

            if (!user)
                return "Tài khoản không tồn tại!";
        }

        if (user.otp != otp) {
            return "Mã OTP không đúng!";
        }

        if (Date.now() > user.otpExpiration) {
            return "Mã OTP đã hết hạn!";
        }
        
    } catch (err) {
        console.error(err);
    }
}