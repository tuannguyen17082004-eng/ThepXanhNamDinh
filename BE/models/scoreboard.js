const mongoose = require('mongoose');

const scoreboardSchema = new mongoose.Schema({
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season'},
    scoreboard: [{
        position: Number,
        img: String,
        team: String,
        match: Number,
        win: Number,
        draw: Number,
        loss: Number,
        goaldiff: Number,
        point: Number
    }]
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = Scoreboard;