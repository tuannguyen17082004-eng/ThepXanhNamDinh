const express = require('express');
const router = express.Router();
const { Login, Logout, ChangePassword } = require('../controllers/AuthController');

router.post('/login', Login);
router.post('/logout', Logout);
router.put('/change-password', ChangePassword);

module.exports = router;