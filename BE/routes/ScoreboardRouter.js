const express = require('express');
const router = express.Router();
const ScoreboardController = require('../controllers/ScoreboardController');
const { GetScoreboardData } = ScoreboardController;

router.get("/", GetScoreboardData);

module.exports = router;