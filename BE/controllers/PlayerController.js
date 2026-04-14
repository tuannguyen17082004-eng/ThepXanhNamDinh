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
        let { fullname, firstname, lastname, number, nationality, birth, img, position, background, placeBirth, height, information } = req.body;

        if (!fullname || !firstname || !lastname || !nationality || !img || !position) {
            return res.status(400).send("Please provide all required fields.");
        }

        const newPlayer = new playerModel.create({
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

        res.status(201).json(newPlayer);
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}

module.exports.UpdatePlayer = async (req, res) => {
    try {
        let { fullname, firstname, lastname, number, nationality, birth, img, position, background, placeBirth, height, information } = req.body;

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
        res.status(200).send("Player deleted successfully.");
    }
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}