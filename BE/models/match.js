const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    stadium: {type: String, require: true},
    league: {type: String, require: true},
    leaguelg: {type: String, require: true},
    hometeam: {type: String, require: true},
    hometeamlg: {type: String, require: true},
    awayteam: {type: String, require: true},
    awayteamlg: {type: String, require: true},
    result: {type: String},
    highlight: {type: String},
    time: {type: Date, default: Date.now}
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;