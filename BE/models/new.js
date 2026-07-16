const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    img: {
        link: {type: String, require: true},
        id: {type: String, require: true}
    },
    title: {type: String, require: true},
    type: {type: String, require: true},
    content: {type: String, require: true},
    time: {type: Date, default: Date.now},
    author: {type: String, require: true},
});

newSchema.index({
    type: 'text',
    title: 'text',
    author: 'text',
    content: 'text'
})

const New = mongoose.model('New', newSchema);

module.exports = New;