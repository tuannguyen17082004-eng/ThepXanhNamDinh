const express = require('express');
const router = express.Router();
const { GetAllPlayers, GetPlayerById, CreatePlayer, UpdatePlayer, DeletePlayer, GetPlayerByPosition } = require('../controllers/PlayerController');

router.get('/', GetAllPlayers);
router.get('/:id', GetPlayerById);
router.post('/', CreatePlayer);
router.put('/:id', UpdatePlayer);
router.delete('/:id', DeletePlayer);

module.exports = router;