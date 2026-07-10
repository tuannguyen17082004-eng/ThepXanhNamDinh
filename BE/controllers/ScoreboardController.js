const ScoreboardModel = require('../models/scoreboard');

module.exports.GetScoreboardData = async (req, res) => {
    try {
        const scoreboard = await ScoreboardModel.find();
        res.status(200).json(scoreboard);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
    }
}