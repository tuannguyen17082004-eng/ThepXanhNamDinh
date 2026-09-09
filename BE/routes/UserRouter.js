const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, getProfile, createUser, verifyUser, createAdmin, updateUser, deleteUser, disableUser } = require('../controllers/UserController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', getAllUsers);
router.get('/profile', isLogined, getProfile);
router.post('/', createUser);
router
router.post('/verify', verifyUser);
router.put('/disable/:id', isLogined, isAdmined, disableUser);
router.get('/:id', isLogined, isAdmined, getUserById);
router.put('/:id', isLogined, upload.single('avatar'), updateUser);
router.delete('/:id', isLogined, deleteUser);

module.exports = router;