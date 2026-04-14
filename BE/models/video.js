const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    link: {type: String, require: true},
    poster: {type: String, require: true},
    title: {type: String, require: true},
    time: {type: Date, default: Date.now}
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;