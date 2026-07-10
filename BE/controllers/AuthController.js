const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const transporter = require('../config/nodemailer_config');

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password)
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");

        const checkUser = await UserModel.findOne({ email });
        if (!checkUser)
            return res.status(400).send("Email hoặc mật khẩu không đúng");

        if (!checkUser.isActived) {
            return res.status(400).send("Tài khoản của bạn đã bị khóa do vi phạm chính sách của chúng tôi, vui lòng liên hệ với chúng tôi để được hỗ trợ!");
        }

        bcrypt.compare(password, checkUser.password, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).send("Internal server error");
            }

            if (!result) { 
                return res.status(400).send("Email hoặc mật khẩu không đúng");
            }

            let token = jwt.sign({ id: checkUser._id, role: checkUser.role }, process.env.JWT_KEY);

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.status(200).json(user = {
                id: checkUser._id,
                name: checkUser.name,
                role: checkUser.role
            });
        });
    } 
    catch (err) 
    {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });
        res.status(200).send("Đăng xuất thành công!");
    } 
    catch (err) 
    {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.ChangePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, id } = req.body;

        if (!id) {
            return res.status(400).send("Vui lòng đăng nhập lại!");
        }

        if (!currentPassword || !newPassword) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        if (currentPassword === newPassword) {
            return res.status(400).send("Mật khẩu mới không được trùng với mật khẩu hiện tại!");
        }

        const checkUser = await UserModel.findById(id);
        if (!checkUser) {
            return res.status(400).send("Không tìm thấy người dùng");
        }

        bcrypt.compare(currentPassword, checkUser.password, (err, result) => {
            if (err) return res.status(500).send("Internal server error");

            if (!result) return res.status(400).send("Mật khẩu hiện tại không đúng");

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).send("Internal server error");

                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    checkUser.password = hash;
                    await checkUser.save();
                })
            });

            res.status(200).send("Đổi mật khẩu thành công!");
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        const checkUser = await UserModel.findOne({ email });
        if (!checkUser) {
            return res.status(400).send("Tài khoản không tồn tại!");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpired = Date.now() + 5 * 60 * 1000;

        checkUser.otp = otp;
        checkUser.otpExpiration = otpExpired;
        await checkUser.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: checkUser.email,
            subject: "Mã OTP đặt lại mật khẩu",
            html: `<p>Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 5 phút.</p>`
        });

        res.status(200).send("Mã OTP đã được gửi đến email của bạn!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.ResetPassword = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        if (!email) {
            return res.status(400).send("Lỗi email!");
        }

        if (!otp) {
            return res.status(400).send("Vui lòng nhập mã OTP!");
        }

        if (!password) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).send("Tài khoản không tồn tại!");
        }

        if (user.otp !== otp) {
            return res.status(400).send("Mã OTP không đúng!");
        }

        if (Date.now() > user.otpExpiration) {
            return res.status(400).send("Mã OTP đã hết hạn!");
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).send("Internal server error");

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send("Internal server error");
                user.password = hash;
                user.otp = null;
                user.otpExpiration = null;
                await user.save();
            })
        });

        res.status(200).send("Đặt lại mật khẩu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.CreateAdmin = async (req, res) => {
    try {
        let { name, gender, email, phone, password } = req.body;
        if (!name || !gender || !email || !phone || !password) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        const checkUser = await UserModel.findOne({ email });
        if (checkUser)
            return res.status(400).send("Email này đã được sử dụng");

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).send("Internal server error");

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send("Internal server error");

                const newUser = new UserModel({
                    name,
                    gender,
                    email,
                    phone,
                    password: hash,
                    role: "admin"
                });

                await UserModel.create(newUser);
                res.status(201).send("Tạo tài khoản admin thành công!");
            })
        });
    } 
    catch (err)
    {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}