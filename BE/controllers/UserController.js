const UserModel = require('../models/user');
const PermanentUserModel = require('../models/permanentUser');
const bcript = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const { uploadImageFile } = require('../service/uploadMedia');
const { checkOTP } = require('../service/checkOTP');
const { sendOTP } = require('../service/sendOTP');

module.exports.getAllUsers = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;

        const users = await UserModel.find().skip((page - 1) * limit).limit(limit);
        res.status(200).json(users);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const userFind = await UserModel.findById(req.params.id);

        res.status(200).json(user = {
            id: userFind._id,
            name: userFind.name,
            gender: userFind.gender,
            email: userFind.email,
            phone: userFind.phone,
            city: userFind.city,
            country: userFind.country,
            avatar: userFind.avatar,
            role: userFind.role,
            isActived: userFind.isActived
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const { name, gender, email, phone, password, otp } = req.body;
        if (!name || !gender || !email || !phone || !password || !otp) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        const checkUser = await UserModel.findOne({ email });
        if (checkUser)
            return res.status(400).send("Email này đã được sử dụng");

        const isValidOTP = await checkOTP(email, otp);

        if (isValidOTP) {
            return res.status(400).send(isValidOTP);
        }

        bcript.genSalt(10, (err, salt) => {
            if (err) return res.status(400).send("Internal server error");

            bcript.hash(password, salt, async (err, hash) => {
                if (err) return res.status(400).send("Internal server error");
                
                const newUser = new UserModel({
                    name,
                    gender,
                    email,
                    phone,
                    password: hash,
                    avatar: {
                        link: "https://res.cloudinary.com/dzh1aei0z/image/upload/v1782899356/Unknown_frsue7.png"
                    }
                });

                await UserModel.create(newUser);
                res.status(201).send("Tạo tài khoản thành công!");
            })
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.verifyUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        let checkUser = await UserModel.findOne({ email });
        if (checkUser)
            return res.status(400).send("Email này đã được sử dụng");

        checkUser = await PermanentUserModel.findOne({ email });
        if (checkUser) {
            const { otp, otpExpired } = await sendOTP(email);

            checkUser.otp = otp;
            checkUser.otpExpiration = otpExpired;
            await checkUser.save();

            return res.status(200).send("Mã OTP đã được gửi đến email của bạn!");
        }

        const { otp, otpExpired } = await sendOTP(email);

        const newPermanentUser = new PermanentUserModel({
            email,
            otp,
            otpExpiration: otpExpired
        });

        await PermanentUserModel.create(newPermanentUser);
        res.status(200).send("Mã OTP đã được gửi đến email của bạn!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { name, gender, email, phone, city, country } = req.body;
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send("Không tìm thấy tài khoản!");
        }

        let avatarLink = user.avatar.link, avatarId = user.avatar.id;

        if (!name || !gender || !email || !phone || !city || !country || !req.file) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }

        if (req.file) {
            if (user.avatar.id)
                await cloudinary.uploader.destroy(user.avatar.id);
            
            const result = await uploadImageFile(req.file.buffer, 'avatar');
            avatarLink = result.secure_url;
            avatarId = result.public_id;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                gender,
                email,
                phone,
                city,
                country,
                avatar: {
                    link: avatarLink,
                    id: avatarId
                }
            }
        );

        res.status(200).send("Cập nhật thông tin tài khoản thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.disableUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Không tìm thấy tài khoản!");
        }

        user.isActived = !user.isActived;
        await user.save();
        res.status(200).send("Cập nhật trạng thái tài khoản thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Xóa tài khoản thành công!");
    } 
    catch (err) 
    {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

