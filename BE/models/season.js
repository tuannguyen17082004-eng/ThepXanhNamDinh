const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    season: { type: Number, require: true },
    scoreboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Scoreboard' },
    matchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
})

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;