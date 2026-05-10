const express = require('express');
const router = express.Router();
const { GetAllPlayers, GetPlayerById, CreatePlayer, UpdatePlayer, DeletePlayer, GetPlayerByPosition } = require('../controllers/PlayerController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', GetAllPlayers);
router.get('/:id', GetPlayerById);
router.post('/', isLogined, isAdmined, upload.fields([
    { name: "img", maxCount: 1 },
    { name: "nationality", maxCount: 1 },
    { name: "background", maxCount: 1 }
]), CreatePlayer);
router.put('/:id', isLogined, isAdmined, upload.fields([
    { name: "img", maxCount: 1 },
    { name: "nationality", maxCount: 1 },
    { name: "background", maxCount: 1 }
]), UpdatePlayer);
router.delete('/:id', isLogined, isAdmined, DeletePlayer);

module.exports = router;