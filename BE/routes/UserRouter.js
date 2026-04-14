const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const isLogined = require('../middleware/isLogin');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', isLogined, getUserById);
router.put('/:id', isLogined, updateUser);
router.delete('/:id', isLogined, deleteUser);

module.exports = router;