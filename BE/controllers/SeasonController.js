const SeasonModel = require('../models/season');
const MatchModel = require('../models/match');
const ScoreboardModel = require('../models/scoreboard');

module.exports.getAllSeason = async (req, res) => {
    try {
        const seasonList = await SeasonModel.find();
        res.status(200).json(seasonList);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.getSeasonByID = async (req, res) => {
    try {
        const season = await SeasonModel.findById(req.params.id);
        res.status(200).json(season);
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.createSeason = async (req, res) => {
    try {
        const { season } = req.body;
        
        const seasonCheck = await SeasonModel.findOne({ season });
        if (seasonCheck) {
            return res.status(500).send("Mùa giải này đã tồn tại!");
        }
        
        const newSeason = new SeasonModel({
            season,
            matchList: []
        })
        await SeasonModel.create(newSeason);
        res.status(201).send("Tạo thông tin giải đấu thành công!");
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.updateSeason = async (req, res) => {
    try {
        const { season } = req.body;
        const updateMatch = await SeasonModel.findByIdAndUpdate(req.params.id, { season });
        res.status(201).send("Sửa thông tin giải đấu thành công!");
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.deleteSeason = async (req, res) => {
    try {
        const season = await SeasonModel.findById(req.params.id);

        if (!season) 
            return res.status(500).send("Không tìm thấy thông tin mùa giải này!");

        if (season.matchList)
            season.matchList.forEach(async (match) => {
                await MatchModel.findByIdAndDelete(match._id);
            });

        if (season.scoreboard)
            await ScoreboardModel.findByIdAndDelete(season.scoreboard._id);

        await SeasonModel.findByIdAndDelete(req.params.id);
        return res.status(200).send("Xóa thông tin giải đấu thành công!");
            
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}