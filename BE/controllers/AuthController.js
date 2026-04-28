const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUser = await UserModel.findOne({ email });
        if (!checkUser)
            return res.status(400).send("Email hoặc mật khẩu không đúng");

        bcrypt.compare(password, checkUser.password, (err, result) => {
            if (err) return res.status(400).send("Something wrong?" + err);

            if (!result) return res.status(400).send("Email hoặc mật khẩu không đúng");

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
        return res.status(400).send("Something wrong?" + err);
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
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.ChangePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, id } = req.body;

        const checkUser = await UserModel.findById(id);
        if (!checkUser)
            return res.status(400).send("Không tìm thấy người dùng");

        bcrypt.compare(currentPassword, checkUser.password, async (err, result) => {
            if (err) return res.status(400).send("Something wrong?" + err);

            if (!result) return res.status(400).send("Mật khẩu hiện tại không đúng");

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            checkUser.password = hashedPassword;
            await checkUser.save();

            res.status(200).send("Đổi mật khẩu thành công!");
        })
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}