const TouramentModel = require('../models/tourament');
const { uploadImageFile } = require('../service/uploadMedia');
const cloudinary = require('cloudinary').v2;

module.exports.GetAllTourament = async (req, res) => {
    try {
        const touramentList = await TouramentModel.find().sort({ name: 1 });
        res.status(200).json(touramentList);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.GetTouramentById = async (req, res) => {
    try {
        const tourament = await TouramentModel.findById(req.params.id);
        res.status(200).json(tourament);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.CreateTourament = async (req, res) => {
    try {
        const { name, logo_url } = req.body;
        let logo_link, logo_id;

        if (!name) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if (req.file && logo_url) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!")
        }

        if (req.file) {
            const result = await uploadImageFile(req.file.buffer, 'tourament');
            logo_link = result.secure_url;
            logo_id = result.public_id;

        } else if (logo_url) {
            const result = await cloudinary.uploader.upload(logo_url, { folder: 'tourament' })
            logo_link = result.secure_url;
            logo_id = result.public_id;
        }

        const newTourament = new TouramentModel({
            name,
            logo: {
                link: logo_link,
                id: logo_id
            }
        });

        await TouramentModel.create(newTourament);
        res.status(200).send("Tạo dữ liệu giải đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.UpdateTourament = async (req, res) => {
    try {
        const tourament = await TouramentModel.findById(req.params.id);
        if (!tourament) {
            return res.status(400).send("Không tìm thấy thông tin giải đấu!");
        }

        const { name, logo_url } = req.body;
        let logo_link = tourament.logo.link, logo_id = tourament.logo.id;

        if (!name) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if (req.file && logo_url) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!")
        }

        if (req.file) {
            if (logo_id)
                await cloudinary.uploader.destroy(logo_id);

            const result = await uploadImageFile(req.file.buffer, 'tourament');
            logo_link = result.secure_url;
            logo_id = result.public_id;

        } else if (logo_url) {
            if (logo_id)
                await cloudinary.uploader.destroy(logo_id);

            const result = await cloudinary.uploader.upload(logo_url, { folder: 'tourament' })
            logo_link = result.secure_url;
            logo_id = result.public_id;
        }

        const updateTourament = await TouramentModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                logo: {
                    link: logo_link,
                    id: logo_id
                }
            });

        res.status(200).send("Chỉnh sửa dữ liệu giải đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.DeleteTourament = async (req, res) => {
    try {
        const tourament = await TouramentModel.findByIdAndDelete(req.params.id);
        await cloudinary.uploader.destroy(tourament.logo.id);
        res.status(200).send("Xóa dữ liệu giải đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}