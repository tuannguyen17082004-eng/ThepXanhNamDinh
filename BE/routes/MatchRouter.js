const express = require('express');
const router = express.Router();
const { getAllMatch, getMatchByID, createMatch, updateMatch, deleteMatch } = require('../controllers/MatchController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', getAllMatch);
router.post('/', isLogined, isAdmined, upload.fields([
    { name: 'leagueLogo', maxCount: 1 },
    { name: 'hometeamLogo', maxCount: 1 },
    { name: 'awayteamLogo', maxCount: 1 }
]), createMatch);
router.put('/:id', isLogined, isAdmined, upload.fields([
    { name: 'leagueLogo', maxCount: 1 },
    { name: 'hometeamLogo', maxCount: 1 },
    { name: 'awayteamLogo', maxCount: 1 }
]), updateMatch);
router.get('/:id', getMatchByID);
router.delete('/:id', isLogined, isAdmined, deleteMatch);

module.exports = router;