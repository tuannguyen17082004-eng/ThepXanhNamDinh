const UserModel = require('../models/user');
const bcript = require('bcrypt');

module.exports.getAllUsers = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;

        const users = await UserModel.find().skip((page - 1) * limit).limit(limit);
        res.status(200).json(users);
    } 
    catch (err)
    {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const userFind = await UserModel.findById(req.params.id);
        res.status(200).json(user = {
            id: userFind._id,
            name: userFind.name,
            username: userFind.username,
            email: userFind.email,
            phone: userFind.phone,
            avatar: userFind.avatar
        });
    } 
    catch (err) 
    {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.createUser = async (req, res) => {
    try {
        let { name, username, email, phone, password, avatar} = req.body;
        console.log(name, username, email, phone, password, avatar);

        const checkUser = await UserModel.findOne({ email });
        console.log(checkUser);
        if (checkUser)
            return res.status(400).send("Email đã được sử dụng");

        bcript.genSalt(10, (err, salt) => {
            bcript.hash(password, salt, async (err, hash) => {
                const newUser = new UserModel({
                    name,
                    username,
                    email,
                    phone,
                    password: hash,
                    role: "user",
                    avatar
                });

                await UserModel.create(newUser);
                res.status(201).send("Tạo tài khoản thành công!");
            })
        });
    } 
    catch (err)
    {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.createAdmin = async (req, res) => {
    try {
        let { name, username, email, phone, password, avatar} = req.body;

        const checkUser = await UserModel.findOne({ email });
        if (checkUser)
            return res.status(400).send("Email đã được sử dụng");

        bcript.genSalt(10, (err, salt) => {
            if (err) return res.status(400).send("Something wrong?" + err);

            bcript.hash(password, salt, async (err, hash) => {
                if (err) return res.status(400).send("Something wrong?" + err);

                const newUser = new UserModel({
                    name,
                    username,
                    email,
                    phone,
                    password: hash,
                    role: "admin",
                    avatar
                });

                await UserModel.create(newUser);
                res.status(201).send("Tạo tài khoản admin thành công!");
            })
        });
    } 
    catch (err)
    {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { name, username, email, phone, password, avatar } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                username,
                email,
                phone,
                password,
                avatar
            }
        );

        res.status(200).json(updatedUser);
    } 
    catch (err) 
    {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } 
    catch (err) 
    {
        return res.status(400).send("Something wrong?" + err);
    }
}

