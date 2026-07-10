const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, createAdmin, updateUser, deleteUser, disableUser } = require('../controllers/UserController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/disable/:id', isLogined, isAdmined, disableUser);
router.get('/:id', isLogined, getUserById);
router.put('/:id', isLogined, upload.single('avatar'), updateUser);
router.delete('/:id', isLogined, deleteUser);

module.exports = router;