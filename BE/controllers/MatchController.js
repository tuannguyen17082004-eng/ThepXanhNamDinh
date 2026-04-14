const MatchModel = require('../models/match');

module.exports.getAllMatch = async (req, res) => {
    try {
        const matchs = await MatchModel.find().sort({time: 1});
        res.status(200).json(matchs);
    } 
    catch (err) {
        return res.status(400).send("Something wrong:" + err);
    }
}

module.exports.getMatchByID = async (req, res) => {
    try {
        const match = await MatchModel.findById(req.params.id);
        res.status(200).json(match);
    } 
    catch (err) {
        return res.status(400).send("Something wrong:" + err);
    }
}

module.exports.createMatch = async (req, res) => {
    try {
        let { stadium, league, leaguelg, hometeam, hometeamlg, awayteam, awayteamlg, result, highlight, time} = req.body;

        if (!stadium || !league || !hometeam || !hometeamlg || !awayteam || !awayteamlg)
            return res.status(400).send("Điền hết thông tin đi đã!");


        const newMatch = new MatchModel({
            stadium,
            league,
            leaguelg,
            hometeam,
            hometeamlg,
            awayteam,
            awayteamlg,
            result,
            highlight,
            time
        });

        await MatchModel.create(newMatch);
        res.status(201).json(newMatch);
    } 
    catch (err) {
        return res.status(400).send("Something wrong:" + err);
    }
}

module.exports.updateMatch = async (req, res) => {
    try {
        let { stadium, league, leaguelg, hometeam, hometeamlg, awayteam, awayteamlg, result, highlights, time} = req.body;

        if (!stadium || !league || !hometeam || !hometeamlg || !awayteam || !awayteamlg)
            return res.status(400).send("Điền hết thông tin đi đã!");

        if (time)
            time = new Date(time);

        const updateMatch = await MatchModel.findByIdAndUpdate(
            req.params.id,
            {
                stadium,
                league,
                leaguelg,
                hometeam,
                hometeamlg,
                awayteam,
                awayteamlg,
                result,
                highlights,
                time 
            }
        );

        res.status(201).json(updateMatch);
    } 
    catch (err) {
        return res.status(400).send("Something wrong:" + err);
    }
}

module.exports.deleteMatch = async (req, res) => {
    try {
        await MatchModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Delete match successful!");
    } 
    catch (err) {
        return res.status(400).send("Something wrong:" + err);
    }
};
