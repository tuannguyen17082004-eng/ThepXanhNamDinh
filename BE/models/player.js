const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    fullname: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    number: { type: String },
    nationality: {
        link: { type: String, require: true },
        id: { type: String, require: true }
    },
    birth: { type: Date },
    img: {
        link: { type: String, require: true },
        id: {type: String, require: true }
    },
    position: {type: String, require: true},
    bio: {
        background: {
            link: { type: String, require: true },
            id: { type: String, require: true }
        },
        placeBirth: { type: String },
        height: { type: Number },
        information: { type: String }
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;