const express = require('express');
const router = express.Router();
const { Login, Logout, ChangePassword, ForgetPassword, ResetPassword, CreateAdmin } = require('../controllers/AuthController');

router.post('/login', Login);
router.post('/logout', Logout);
router.put('/change-password', ChangePassword);
router.post('/forget-password', ForgetPassword);
router.post('/reset-password', ResetPassword);
router.post('/admin', CreateAdmin);

module.exports = router;