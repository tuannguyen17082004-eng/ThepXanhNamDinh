const express = require('express');
const router = express.Router();
const { getAllMatch, getMatchByID, createMatch, updateMatch, deleteMatch } = require('../controllers/MatchController');

router.get('/', getAllMatch);
router.post('/', createMatch);
router.put('/:id', updateMatch);
router.get('/:id', getMatchByID);
router.delete('/:id', deleteMatch);

module.exports = router;