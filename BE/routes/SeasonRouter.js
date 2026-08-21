const express = require('express');
const router = express.Router();
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const { getAllSeason, getSeasonByID, createSeason, updateSeason, deleteSeason } = require('../controllers/SeasonController');

router.get('/', getAllSeason);
router.get('/:id', getSeasonByID);
router.post('/', isLogined, isAdmined, createSeason);
router.put('/:id', isLogined, isAdmined, updateSeason);
router.delete('/:id', isLogined, isAdmined, deleteSeason);

module.exports = router;