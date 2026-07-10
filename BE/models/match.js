const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    stadium: {type: String, require: true},
    league: {type: String, require: true},
    leaguelg: {
        link: {type: String, require: true},
        id: {type: String, require: true}
    },
    hometeam: {type: String, require: true},
    hometeamlg: {
        link: {type: String, require: true},
        id: {type: String, require: true}
    },
    awayteam: {type: String, require: true},
    awayteamlg: {
        link: {type: String, require: true},
        id: {type: String, require: true}
    },
    result: {type: String},
    highlight: {type: String},
    time: {type: Date, require: true}
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;