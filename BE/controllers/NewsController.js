const NewModel = require('../models/new');
const cloudinary = require('cloudinary').v2;
const { uploadImageFile } = require('../service/uploadMedia');

module.exports.GetAllNews = async (req, res) => {
    try {
        const filter = {};
        const { page, limit, type, title, author, time } = req.query;

        if (type) filter.type = type;
        if (author) filter.author = author;

        const news = await NewModel.find(filter).sort({time: -1}).skip((page - 1) * limit).limit(limit);
        res.status(200).json(news);

    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
    }
}

module.exports.GetNewsById = async (req, res) => {
    try {
        const newsItem = await NewModel.findById(req.params.id);
        res.status(200).json(newsItem);

    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
    }
}

module.exports.CreateNews = async (req, res) => {
    try {
        const { img_url, title, type, author, content } = req.body;
        let imgLink, imgId;

        if (!title || !type || !author || !content || (!req.file && !img_url)) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if (req.file && img_url) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!")
        }

        if (req.file) {
            const result = await uploadImageFile(req.file.buffer, 'news');
            imgLink = result.secure_url;
            imgId = result.public_id;

        } else {
            const result = await cloudinary.uploader.upload(img_url, { folder: 'news' })
            imgLink = result.secure_url;
            imgId = result.public_id;
        }

        const newNewsItem = new NewModel({
            img: {
                id: imgId,
                link: imgLink
            },
            title,
            type,
            content,
            author
        });

        await NewModel.create(newNewsItem);
        res.status(201).send("Thêm tin tức thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.UpdateNews = async (req, res) => {
    try {
        const news = await NewModel.findById(req.params.id);
        if (!news) {
            return res.status(400).send("Không tìm thấy tin tức!");
        }

        const { img_url, title, type, author, content } = req.body;
        let imgLink = news.img.link, imgId = news.img.id;

        if (!title || !type || !author || !content) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if (req.file && img_url) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!")
        }
        
        if (req.file) {
            if (news.img.id)
                await cloudinary.uploader.destroy(news.img.id);

            const result = await uploadImageFile(req.file.buffer, 'news');
            imgLink = result.secure_url;
            imgId = result.public_id;

        } else if (img_url) {
            if (news.img.id)
                await cloudinary.uploader.destroy(news.img.id);
            
            const result = await cloudinary.uploader.upload(img_url, { folder: 'news' })
            imgLink = result.secure_url;
            imgId = result.public_id;
        }

        const updatedNewsItem = await NewModel.findByIdAndUpdate(
            req.params.id,
            {
                img: {
                    id: imgId,
                    link: imgLink
                },
                title,
                type,
                content,
                author
            }
        );

        res.status(200).send("Chỉnh sửa thông tin tin tức thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.DeleteNews = async (req, res) => {
    try {
        const result = await NewModel.findByIdAndDelete(req.params.id);
        await cloudinary.uploader.destroy(result.img.id);
        res.status(200).send("Xóa tin tức thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}