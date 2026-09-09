const MatchModel = require('../models/match');
const SeasonModel = require('../models/season');
const { uploadImageFile } = require('../service/uploadMedia');
const cloudinary = require('cloudinary').v2;

module.exports.getAllMatch = async (req, res) => {
    try {
        const { season } = req.query;
        const seasonCheck = await SeasonModel.findOne({ season: season });
        const matchList = await MatchModel.find({ season: seasonCheck._id }).populate('hometeam').populate('awayteam').sort({time: 1});      
        res.status(200).json(matchList);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.getMatchByID = async (req, res) => {
    try {
        const match = await MatchModel.findById(req.params.id).populate('season').populate('hometeam').populate('awayteam');
        res.status(200).json(match);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.createMatch = async (req, res) => {
    try {
        const { season, stadium, league, leaguelg_url, hometeam, awayteam, result, highlight, time } = req.body;
        let leaguelink, leagueId;

        const seasonCheck = await SeasonModel.findOne({season});

        if (!season) 
            return res.status(500).send("Không tìm thấy thông tin mùa giải này!");

        if (!stadium || !league || !hometeam || !awayteam || !time)
            return res.status(400).send("Vui lòng điền đầy đủ thông tin!");

        if (req.file && leaguelg_url)
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!");

        if (req.file) {
            const respond = await uploadImageFile(req.file.buffer, 'match');
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;

        } else if (leaguelg_url) {
            const respond = await cloudinary.uploader.upload(leaguelg_url, { folder: 'match' });
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;
        }

        const newMatch = new MatchModel({
            season: seasonCheck._id,
            stadium,
            league,
            leaguelg: {
                link: leaguelink,
                id: leagueId
            },
            hometeam,
            awayteam,
            result,
            highlight,
            time
        });

        await MatchModel.create(newMatch);
        await seasonCheck.matchList.push(newMatch._id);
        await seasonCheck.save();
        
        res.status(201).send("Tạo thông tin trận đấu thành công!");
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.updateMatch = async (req, res) => {
    try {
        const match = await MatchModel.findById(req.params.id);
        const { stadium, league, leaguelg_url, hometeam, awayteam, result, highlights, time } = req.body;
        let leaguelink = match.leaguelg.link, leagueId = match.leaguelg.id;

        if (!stadium || !league || !hometeam || !awayteam || !time)
            return res.status(400).send("Vui lòng điền đầy đủ thông tin!");

        if (req.file && leaguelg_url)
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!");

        if (req.file) {
            if (match.leaguelg.id) 
                await cloudinary.uploader.destroy(match.leaguelg.id);

            const respond = await uploadImageFile(req.file.buffer, 'match');
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;

        } else if (leaguelg_url) {
            if (match.leaguelg.id) 
                await cloudinary.uploader.destroy(match.leaguelg.id);

            const respond = await cloudinary.uploader.upload(leaguelg_url, 'match');
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;
        }

        const updateMatch = await MatchModel.findByIdAndUpdate(
            req.params.id,
            {
                stadium,
                league,
                leaguelg: {
                    link: leaguelink,
                    id: leagueId
                },
                hometeam,
                awayteam,
                result,
                highlights,
                time 
            }
        );

        res.status(201).send("Sửa thông tin trận đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.deleteMatch = async (req, res) => {
    try {
        const result = await MatchModel.findByIdAndDelete(req.params.id);
        await cloudinary.uploader.destroy(result.leaguelg.id);
        res.status(200).send("Xóa thông tin trận đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};
