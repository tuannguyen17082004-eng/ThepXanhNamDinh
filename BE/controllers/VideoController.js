const Video = require('../models/video');
const VideoModel = require('../models/video');

module.exports.GetAllVideos = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;

        const filter = {};
        const { time, title } = req.query;

        if (time) filter.time = time;
        if (title) filter.title = title;

        const videos = await VideoModel.find(filter).sort({ time: -1}).skip((page - 1) * limit).limit(limit);
        res.status(200).json(videos);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.GetVideoById = async (req, res) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        res.status(200).json(video);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.CreateVideo = async (req, res) => {
    try {
        let { link, poster, title } = req.body;

        if (!link || !poster || !title) {
            return res.status(400).send("Please provide all required fields.");
        }

        const newVideo = new VideoModel({
            link,
            poster,
            title
        });

        await VideoModel.create(newVideo);

        res.status(201).json(newVideo);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.UpdateVideo = async (req, res) => {
    try {
        let { link, poster, title } = req.body;

        if (!link || !poster || !title) {
            return res.status(400).send("Please provide all required fields.");
        }

        const updatedVideo = await VideoModel.findByIdAndUpdate(
            req.params.id,
            {
                link,
                poster,
                title
            }
        );

        res.status(200).json(updatedVideo);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.DeleteVideo = async (req, res) => {
    try {
        await VideoModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Video deleted successfully.");
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}