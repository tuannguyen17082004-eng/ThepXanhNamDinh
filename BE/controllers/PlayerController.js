const playerModel = require('../models/player');
const { uploadImageFile } = require('../service/uploadMedia');
const cloudinary = require("../config/cloudinary_config");

module.exports.GetAllPlayers = async (req, res) => {
    try {
        const filter = {};
        const { position } = req.query;

        if (position) filter.position = position;

        const players = await playerModel.find(filter);
        res.status(200).json(players);

    } catch (err) {
        console.log(err)
        return res.status(400).send("Internal server error");
    }
}

module.exports.GetPlayerById = async (req, res) => {
    try {
        const player = await playerModel.findById(req.params.id);
        res.status(200).json(player);

    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
    }
}

module.exports.CreatePlayer = async (req, res) => {
    try {
        const { fullname, firstname, lastname, number, nationality_url, birth, img_url, position, background_url, placeBirth, height, information } = req.body;
        let imgLink, imgId, nationality, nationalityId, background, backgroundId;

        if (!fullname || !firstname || !lastname || !number || !birth || !position || !placeBirth || !height || !information || (!req.files["background"] && !background_url) || (!req.files["nationality"] && !nationality_url)) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }
        
        if ((req.files["img"] && img_url) || (req.files["background"] && background_url) || (req.files["nationality"] && nationality_url)) {
            return res.status(400).send("Chỉ được chọn 1 trong 2 phương thức tải ảnh!");
        }

        if (!req.files["img"] && !img_url) {
            imgLink = "https://res.cloudinary.com/dzh1aei0z/image/upload/v1782899356/Unknown_frsue7.png";
        }

        
        if (req.files["img"]) {
            const result = await uploadImageFile(req.files.img[0].buffer, 'player');
            imgLink = result.secure_url;
            imgId = result.public_id;

        } else if (img_url) {
            const result = await cloudinary.uploader.upload(img_url, { folder: 'player' });
            imgLink = result.secure_url;
            imgId = result.public_id;
        }
        
        if (req.files["nationality"]) {
            const result = await uploadImageFile(req.files.nationality[0].buffer, 'player');
            nationalityLink = result.secure_url;
            nationalityId = result.public_id;

        } else if (nationality_url) {
            const result = await cloudinary.uploader.upload(nationality_url, { folder: 'player' });
            nationalityLink = result.secure_url;
            nationalityId = result.public_id;
        }
        
        if (req.files["background"]) {
            const result = await uploadImageFile(req.files.background[0].buffer, 'player');
            backgroundLink = result.secure_url;
            backgroundId = result.public_id;

        } else if (background_url) {
            const result = await cloudinary.uploader.upload(background_url, { folder: 'player'});
            backgroundLink = result.secure_url;
            backgroundId = result.public_id;
        }

        const newPlayer = new playerModel({
            fullname,
            firstname,
            lastname,
            number,
            nationality: {
                link: nationalityLink,
                id: nationalityId
            },
            birth,
            img: {
                link: imgLink,
                id: imgId
            },
            position,
            bio: {
                background: {
                    link: backgroundLink,
                    id: backgroundId
                },
                placeBirth,
                height,
                information
            }
        });

        await playerModel.create(newPlayer);
        res.status(201).send("Thêm cầu thủ thành công!");

    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
    }
}

module.exports.UpdatePlayer = async (req, res) => {
    try {
        const user = await playerModel.findById(req.params.id);
        if (!user) {
            return res.status(400).send("Không tìm thấy thông tin cầu thủ!");
        }

        const { fullname, firstname, lastname, number, nationality_url, birth, img_url, position, background_url, placeBirth, height, information } = req.body;
        let img = user.img.link, imgId = user.img.id, nationality = user.nationality.link, nationalityId = user.nationality.id, background = user.bio.background.link, backgroundId = user.bio.background.id;

        if (!fullname || !firstname || !lastname || !number || !birth || !position || !placeBirth || !height || !information) {
            return res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
        }
        
        if (req.files["img"]) {
            if (user.img.id)
                await cloudinary.uploader.destroy(user.img.id);

            const result = await uploadImageFile(req.files.img[0].buffer, 'player');
            imgLink = result.secure_url;
            imgId = result.public_id;

        } else if (img_url) {
            if (user.img.id)
                await cloudinary.uploader.destroy(user.img.id);

            const result = await cloudinary.uploader.upload(img_url, { folder: 'player'});
            imgLink = result.secure_url;
            imgId = result.public_id;
        }
        
        if (req.files["nationality"]) {
            if (user.nationality.id)
                await cloudinary.uploader.destroy(user.nationality.id);

            const result = await uploadImageFile(req.files.nationality[0].buffer, 'player');
            nationalityLink = result.secure_url;
            nationalityId = result.public_id;

        } else if (nationality_url) {
            if (user.nationality.id)
                await cloudinary.uploader.destroy(user.nationality.id);

            const result = await cloudinary.uploader.upload(nationality_url, { folder: 'player'});
            nationalityLink = result.secure_url;
            nationalityId = result.public_id;
        }
        
        if (req.files["background"]) {
            if (user.bio.background.id)
                await cloudinary.uploader.destroy(user.bio.background.id);

            const result = await uploadImageFile(req.files.background[0].buffer, 'player');
            backgroundLink = result.secure_url;
            backgroundId = result.public_id;

        } else if (background_url) {
            if (user.bio.background.id)
                await cloudinary.uploader.destroy(user.bio.background.id);

            const result = await cloudinary.uploader.upload(background_url, { folder: 'player'});
            backgroundLink = result.secure_url;
            backgroundId = result.public_id;
        }

        const updatedPlayer = await playerModel.findByIdAndUpdate(
            req.params.id,
            {
                fullname,
                firstname,
                lastname,
                number,
                nationality: {
                    link: nationalityLink,
                    id: nationalityId
                },
                birth,
                img: {
                    link: imgLink,
                    id: imgId
                },
                position,
                bio: {
                    background: {
                        link: backgroundLink,
                        id: backgroundId
                    },
                    placeBirth,
                    height,
                    information
                }
            }
        );
        res.status(200).send("Cập nhật thông tin cầu thủ thành công!");

    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal server error");
    }
}

module.exports.DeletePlayer = async (req, res) => {
    try {
        const result = await playerModel.findByIdAndDelete(req.params.id);

        await cloudinary.api.delete_resources([result.nationality.id, result.img.id, result.bio.background.id]);
        res.status(200).send("Xóa cầu thủ thành công!");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}