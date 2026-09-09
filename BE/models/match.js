const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    season : { type: mongoose.Schema.Types.ObjectId, ref: 'Season' },
    stadium: { type: String, require: true },
    league: { type: String, require: true },
    leaguelg: {
        link: { type: String, require: true },
        id: { type: String, require: true }
    },
    hometeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        require: true
    },
    awayteam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        require: true
    },
    result: { type: String },
    highlight: { type: String },
    time: { type: Date, require: true }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;