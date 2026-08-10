const MatchModel = require('../models/match');
const { uploadImageFile } = require('../service/uploadMedia');
const cloudinary = require('cloudinary').v2;

module.exports.getAllMatch = async (req, res) => {
    try {
        const matchs = await MatchModel.find().sort({time: 1});
        res.status(200).json(matchs);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.getMatchByID = async (req, res) => {
    try {
        const match = await MatchModel.findById(req.params.id);
        res.status(200).json(match);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.createMatch = async (req, res) => {
    try {
        const { stadium, league, leaguelg_url, hometeam, hometeamlg_url, awayteam, awayteamlg_url, result, highlight, time } = req.body;
        let leaguelink, leagueId, hometeamlink, hometeamId, awayteamlink, awayteamId;

        if (!stadium || !league || !hometeam || !awayteam || !time || (!req.files["hometeamLogo"] && !hometeamlg_url) || (!req.files["awayteamLogo"] && !awayteamlg_url))
            return res.status(400).send("Vui lòng điền đầy đủ thông tin!");

        if ((req.files["leagueLogo"] && leaguelg_url) || (req.files["hometeamLogo"] && hometeamlg_url) || (req.files["awayteamLogo"] && awayteamlg_url))
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!");

        if (req.files["leagueLogo"]) {
            const respond = await uploadImageFile(req.files["leagueLogo"][0].buffer, 'match');
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;

        } else if (leaguelg_url) {
            const respond = await cloudinary.uploader.upload(leaguelg_url, { folder: 'match' });
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;
        }

        if (req.files["hometeamLogo"]) {
            const respond = await uploadImageFile(req.files["hometeamLogo"][0].buffer, 'match');
            hometeamlink = respond.secure_url;
            hometeamId = respond.public_id;

        } else {
            const respond = await cloudinary.uploader.upload(hometeamlg_url, { folder: 'match' });
            hometeamlink = respond.secure_url;
            hometeamId = respond.public_id;
        }

        if (req.files["awayteamLogo"]) {
            const respond = await uploadImageFile(req.files["awayteamLogo"][0].buffer, 'match');
            awayteamlink = respond.secure_url;
            awayteamId = respond.public_id;

        } else {
            const respond = await cloudinary.uploader.upload(awayteamlg_url, { folder: 'match' });
            awayteamlink = respond.secure_url;
            awayteamId = respond.public_id;
        }

        const newMatch = new MatchModel({
            stadium,
            league,
            leaguelg: {
                link: leaguelink,
                id: leagueId
            },
            hometeam,
            hometeamlg: {
                link: hometeamlink,
                id: hometeamId
            },
            awayteam,
            awayteamlg: {
                link: awayteamlink,
                id: awayteamId
            },
            result,
            highlight,
            time
        });

        await MatchModel.create(newMatch);
        res.status(201).json("Tạo thông tin trận đấu thành công!");
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.updateMatch = async (req, res) => {
    try {
        const match = await MatchModel.findById(req.params.id);
        const { stadium, league, leaguelg_url, hometeam, hometeamlg_url, awayteam, awayteamlg_url, result, highlights, time } = req.body;
        let leaguelink = match.leaguelg.link, leagueId = match.leaguelg.id, hometeamlink = match.hometeamlg.link, hometeamId = match.hometeamlg.id, awayteamlink = match.awayteamlg.link, awayteamId = match.awayteamlg.id;

        if (!stadium || !league || !hometeam || !awayteam || !time)
            return res.status(400).send("Vui lòng điền đầy đủ thông tin!");

        if ((req.files["leagueLogo"] && leaguelg_url) || (req.files["hometeamLogo"] && hometeamlg_url) || (req.files["awayteamLogo"] && awayteamlg_url))
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!");

        if (req.files["leagueLogo"]) {
            if (match.leaguelg.id) 
                await cloudinary.uploader.destroy(match.leaguelg.id);

            const respond = await uploadImageFile(req.files["leagueLogo"][0].buffer, 'match');
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;

        } else if (leaguelg_url) {
            if (match.leaguelg.id) 
                await cloudinary.uploader.destroy(match.leaguelg.id);

            const respond = await cloudinary.uploader.upload(leaguelg_url, 'match');
            leaguelink = respond.secure_url;
            leagueId = respond.public_id;
        }

        if (req.files["hometeamLogo"]) {
            if (match.hometeamlg.id)
                await cloudinary.uploader.destroy(match.hometeamlg.id);
            
            const respond = await uploadImageFile(req.files["hometeamLogo"][0].buffer, 'match');
            hometeamlink = respond.secure_url;
            hometeamId = respond.public_id;
            
        } else if (hometeamlg_url){
            if (match.hometeamlg.id)
                await cloudinary.uploader.destroy(match.hometeamlg.id);

            const respond = await cloudinary.uploader.upload(hometeamlg_url, 'match');
            hometeamlink = respond.secure_url;
            hometeamId = respond.public_id;
        }

        if (req.files["awayteamLogo"]) {
            if (match.awayteamlg.id)
                await cloudinary.uploader.destroy(match.awayteamlg.id);

            const respond = await uploadImageFile(req.files["awayteamLogo"][0].buffer, 'match');
            awayteamlink = respond.secure_url;
            awayteamId = respond.public_id;

        } else if (awayteamlg_url) {
            if (match.awayteamlg.id)
                await cloudinary.uploader.destroy(match.awayteamlg.id);

            const respond = await cloudinary.uploader.upload(awayteamlg_url, 'match');
            awayteamlink = respond.secure_url;
            awayteamId = respond.public_id;
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
                hometeamlg: {
                    link: hometeamlink,
                    id: hometeamId
                },
                awayteam,
                awayteamlg: {
                    link: awayteamlink,
                    id: awayteamId
                },
                result,
                highlights,
                time 
            }
        );

        res.status(201).json("Sửa thông tin trận đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports.deleteMatch = async (req, res) => {
    try {
        const result = await MatchModel.findByIdAndDelete(req.params.id);
        await cloudinary.api.delete_resources([result.leaguelg.id, result.hometeamlg.id, result.awayteamlg.id]);
        res.status(200).send("Xóa thông tin trận đấu thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};
