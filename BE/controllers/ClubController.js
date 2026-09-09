const ClubModel = require('../models/club');
const { uploadImageFile } = require('../service/uploadMedia');
const cloudinary = require('cloudinary').v2;

module.exports.GetAllClub = async (req, res) => {
    try {
        const clubList = await ClubModel.find().sort({ name: 1 });
        res.status(200).json(clubList);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.GetClubById = async (req, res) => {
    try {
        const club = await ClubModel.findById(req.params.id);
        res.status(200).json(club);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.CreateClub = async (req, res) => {
    try {
        const { name, shortname, logo_url } = req.body;
        let logo_link, logo_id;

        if (!name || !shortname || (!req.file && !logo_url)) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if (req.file && logo_url) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!")
        }

        if (req.file) {
            const result = await uploadImageFile(req.file.buffer, 'club');
            logo_link = result.secure_url;
            logo_id = result.public_id;

        } else {
            const result = await cloudinary.uploader.upload(logo_url, { folder: 'club' })
            logo_link = result.secure_url;
            logo_id = result.public_id;
        }

        const newClub = new ClubModel({
            name,
            shortname,
            logo: {
                link: logo_link,
                id: logo_id
            }
        });

        await ClubModel.create(newClub);
        res.status(200).send("Tạo dữ liệu câu lạc bộ thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.UpdateClub = async (req, res) => {
    try {
        const club = await ClubModel.findById(req.params.id);
        if (!club) {
            return res.status(400).send("Không tìm thấy câu lạc bộ!");
        }

        const { name, shortname, logo_url } = req.body;
        let logo_link = club.logo.link, logo_id = club.logo.id;

        if (!name || !shortname || (!req.file && !logo_url)) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if (req.file && logo_url) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!")
        }

        if (req.file) {
            if (logo_id)
                await cloudinary.uploader.destroy(logo_id);

            const result = await uploadImageFile(req.file.buffer, 'club');
            logo_link = result.secure_url;
            logo_id = result.public_id;

        } else if (logo_url) {
            if (logo_id)
                await cloudinary.uploader.destroy(logo_id);

            const result = await cloudinary.uploader.upload(logo_url, { folder: 'club' })
            logo_link = result.secure_url;
            logo_id = result.public_id;
        }

        const updateClub = await ClubModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                shortname,
                logo: {
                    link: logo_link,
                    id: logo_id
                }
            });

        res.status(200).send("Chỉnh sửa dữ liệu câu lạc bộ thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.DeleteClub = async (req, res) => {
    try {
        const club = await ClubModel.findByIdAndDelete(req.params.id);
        await cloudinary.uploader.destroy(club.logo.id);
        res.status(200).send("Xóa dữ liệu câu lạc bộ thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}