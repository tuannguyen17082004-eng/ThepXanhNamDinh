const SeasonModel = require('../models/season');

module.exports.GetScoreboardData = async (req, res) => {
    try {
        const { season } = req.query;

        const scoreboardCheck = await SeasonModel.findOne({ season : season }).populate('scoreboard');
        res.status(200).json(scoreboardCheck.scoreboard);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}