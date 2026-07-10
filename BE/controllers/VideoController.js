const VideoModel = require('../models/video');
const cloudinary = require('cloudinary').v2;
const { uploadImageFile, uploadVideoFile } = require('../service/uploadMedia');

module.exports.GetAllVideos = async (req, res) => {
    try {
        const filter = {};
        const { page, limit, time, title } = req.query;

        if (time) filter.time = time;
        if (title) filter.title = title;

        const videos = await VideoModel.find(filter).sort({ time: -1}).skip((page - 1) * limit).limit(limit);
        res.status(200).json(videos);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.GetVideoById = async (req, res) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        res.status(200).json(video);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.CreateVideo = async (req, res) => {
    try {
        let { video_url, poster_url, title } = req.body;
        let videoLink, videoId, posterLink, posterId;

        if (!title || (!req.files["link"] && !video_url) || (!req.files["poster"] && !poster_url)) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if ((req.files["link"] && video_url) || (req.files["poster"] && poster_url)) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức")
        }

        if (req.files["link"]) {
            const result = await uploadVideoFile(req.files["link"][0].buffer, 'video');
            videoLink = result.secure_url;
            videoId = result.public_id;

        } else {
            const result = await cloudinary.uploader.upload(video_url, { folder: 'video', resource_type: 'video' })
            videoLink = result.secure_url;
            videoId = result.public_id;
        }

        if (req.files["poster"]) {
            const result = await uploadImageFile(req.files["poster"][0].buffer, 'video');
            posterLink = result.secure_url;
            posterId = result.public_id;

        } else {
            const result = await cloudinary.uploader.upload(poster_url, { folder: 'video' });
            posterLink = result.secure_url;
            posterId = result.public_id;
        }

        const newVideo = new VideoModel({
            video: {
                link: videoLink,
                id: videoId
            },
            poster: {
                link: posterLink,
                id: posterId
            },
            title
        });

        await VideoModel.create(newVideo);
        res.status(201).send("Tạo video thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.UpdateVideo = async (req, res) => {
    try {
        let { video_url, poster_url, title } = req.body;
        const video = await VideoModel.findById(req.params.id);
        if (!video) {
            return res.status(400).send("Không tìm thấy video!");
        }

        let videoLink = video.video.link, videoId = video.video.id, posterLink = video.poster.link, posterId = video.poster.id;

        if (!title) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!")
        }

        if ((req.files["link"] && video_url) || (req.files["poster"] && poster_url)) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức!")
        }


        if (req.files["link"]) {
            if (video.video.id)
                await cloudinary.uploader.destroy(video.video.id, { resource_type: 'video'});

            const result = await uploadVideoFile(req.files["link"][0].buffer, 'video');
            videoLink = result.secure_url;
            videoId = result.public_id;

        } else if (video_url) {
            if (video.video.id)
                await cloudinary.uploader.destroy(video.video.id, { resource_type: 'video'});

            const result = await cloudinary.uploader.upload(video_url, { folder: 'video', resource_type: 'video' })
            videoLink = result.secure_url;
            videoId = result.public_id;
        }

        if (req.files["poster"]) {
            if (video.poster.id)
                await cloudinary.uploader.destroy(video.poster.id);

            const result = await uploadImageFile(req.files["poster"][0].buffer, 'video');
            posterLink = result.secure_url;
            posterId = result.public_id;

        } else if (poster_url) {
            if (video.poster.id)
                await cloudinary.uploader.destroy(video.poster.id);

            const result = await cloudinary.uploader.upload(poster_url, { folder: 'video' });
            posterLink = result.secure_url;
            posterId = result.public_id;
        }

        const updatedVideo = await VideoModel.findByIdAndUpdate(
            req.params.id,
            {
                video: {
                    link: videoLink,
                    id: videoId
                },
                poster: {
                    link: posterLink,
                    id: posterId
                },
                title
            }
        );

        res.status(200).send("Chỉnh sửa thông tin video thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.DeleteVideo = async (req, res) => {
    try {
        const result = await VideoModel.findByIdAndDelete(req.params.id);
        await cloudinary.api.delete_resources([result.video.id, result.poster.id]);
        res.status(200).send("Xóa video thành công!");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}