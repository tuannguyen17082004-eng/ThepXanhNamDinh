const playerModel = require('../models/player');

module.exports.GetAllPlayers = async (req, res) => {
    try {
        const filter = {};
        const { position } = req.query;

        if (position) filter.position = position;

        const players = await playerModel.find(filter);
        res.status(200).json(players);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.GetPlayerById = async (req, res) => {
    try {
        const player = await playerModel.findById(req.params.id);
        res.status(200).json(player);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.CreatePlayer = async (req, res) => {
    try {
        const { fullname, firstname, lastname, number, nationality_url, birth, img_url, position, background_url, placeBirth, height, information } = req.body;
        let img, nationality, background;
        
        if (req.files["img"]) {
            img = "/pictures/" + req.files["img"][0].filename;
        } else {
            img = img_url;
        }

        if (req.files["nationality"]) {
            nationality = "/pictures/" + req.files["nationality"][0].filename;
        } else {
            nationality = nationality_url;
        }

        if (req.files["background"]) {
            background = "/pictures/" + req.files["background"][0].filename;
        } else {
            background = background_url;
        }

        const newPlayer = new playerModel({
            fullname,
            firstname,
            lastname,
            number,
            nationality,
            birth,
            img,
            position,
            bio: {
                background,
                placeBirth,
                height,
                information
            }
        });

        await playerModel.create(newPlayer);
        res.status(201).json(newPlayer);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.UpdatePlayer = async (req, res) => {
    try {
        const user = await playerModel.findById(req.params.id);
        const { fullname, firstname, lastname, number, nationality_url, birth, img_url, position, background_url, placeBirth, height, information } = req.body;
        let img, nationality, background;
        
        if (!req.files["img"] && img_url == "null") {
            img = user.img;
        }
        else if (req.files["img"]) {
            img = "/pictures/" + req.files["img"][0].filename;
        } else {
            img = img_url;
        }

        if (!req.files["nationality"] && nationality_url == "null") {
            nationality = user.nationality;
        }
        else if (req.files["nationality"]) {
            nationality = "/pictures/" + req.files["nationality"][0].filename;
        } else {
            nationality = nationality_url;
        }

        if (!req.files["background"] && background_url == "null") {
            background = user.bio.background;
        }
        else if (req.files["background"]) {
            background = "/pictures/" + req.files["background"][0].filename;
        } else {
            background = background_url;
        }

        const updatedPlayer = await playerModel.findByIdAndUpdate(
            req.params.id,
            {
                fullname,
                firstname,
                lastname,
                number,
                nationality,
                birth,
                img,
                position,
                bio: {
                    background,
                    placeBirth,
                    height,
                    information
                }
            }
        );
        res.status(200).json(updatedPlayer);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.DeletePlayer = async (req, res) => {
    try {
        await playerModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Xóa thành công!");
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}