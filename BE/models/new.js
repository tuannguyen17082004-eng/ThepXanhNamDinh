const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    img: {type: String, require: true},
    title: {type: String, require: true},
    type: {type: String, require: true},
    content: {type: String, require: true},
    time: {type: Date, default: Date.now},
    author: {type: String, require: true},
});

const New = mongoose.model('New', newSchema);

module.exports = New;