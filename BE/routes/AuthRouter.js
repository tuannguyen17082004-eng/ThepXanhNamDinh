const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Login, Logout, GoogleLogin, ChangePassword, ForgetPassword, ResetPassword, CreateAdmin } = require('../controllers/AuthController');

router.post('/login', Login);
router.post('/logout', Logout);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account", session: false }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), GoogleLogin);
router.put('/change-password', ChangePassword);
router.post('/forget-password', ForgetPassword);
router.post('/reset-password', ResetPassword);
router.post('/admin', CreateAdmin);

module.exports = router;