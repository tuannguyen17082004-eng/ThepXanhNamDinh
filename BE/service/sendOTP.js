const transporter = require('../config/nodemailer_config');

module.exports.sendOTP = async (email) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpired = Date.now() + 5 * 60 * 1000;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Mã OTP",
            html: `<p style="padding: 10px 0;">Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 5 phút.</p>
            <p>Chúng tôi mong rằng bạn sẽ tận hưởng những lợi ích khi tạo tài khoản trang web này!</p>`
        });

        return { otp, otpExpired };

    } catch (err) {
        console.error(err);
    }
}