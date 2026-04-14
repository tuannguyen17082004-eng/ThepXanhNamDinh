const express = require('express');
const router = express.Router();
const { Login, Logout } = require('../controllers/AuthController');

router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router;