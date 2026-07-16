const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    video: {
        link: { type: String, require: true},
        id: { type: String, require: true }
    },
    poster: {
        link: { type: String, require: true},
        id: { type: String, require: true }
    },
    title: {type: String, require: true},
    time: {type: Date, default: Date.now}
});

videoSchema.index({
    title: 'text'
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;