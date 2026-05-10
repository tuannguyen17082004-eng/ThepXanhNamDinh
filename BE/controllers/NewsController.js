const NewModel = require('../models/new');

module.exports.GetAllNews = async (req, res) => {
    try {
        const limit = req.query.limit;
        const page = req.query.page;

        const filter = {};

        const { type, title, author, time } = req.query;

        if (type) filter.type = type;
        if (author) filter.author = author;

        const news = await NewModel.find(filter).sort({time: -1}).skip((page - 1) * limit).limit(limit);
        res.status(200).json(news);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.GetNewsById = async (req, res) => {
    try {
        const newsItem = await NewModel.findById(req.params.id);
        res.status(200).json(newsItem);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.CreateNews = async (req, res) => {
    try {
        const { img_url, title, type, author, content } = req.body;
        let img;

        if (req.file) {
            img = "/pictures/" + req.file;
        } else {
            img = img_url;
        }

        const newNewsItem = new NewModel({
            img,
            title,
            type,
            content,
            author
        });

        await NewModel.create(newNewsItem);
        res.status(201).json(newNewsItem);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.UpdateNews = async (req, res) => {
    try {
        const { img_url, title, type, author, content } = req.body;
        let img;

        const news = NewModel.findById(req.params.id);

        if (!req.file && img_url == "null") {
            img = news.img;
        }
        else if (req.file) {
            img = "/pictures/" + req.file;
        } else {
            img = img_url;
        }

        const updatedNewsItem = await NewModel.findByIdAndUpdate(
            req.params.id,
            {
                img,
                title,
                type,
                content,
                author
            }
        );

        res.status(200).json(updatedNewsItem);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.DeleteNews = async (req, res) => {
    try {
        await NewModel.findByIdAndDelete(req.params.id);
        res.status(200).send("News deleted successfully.");
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}