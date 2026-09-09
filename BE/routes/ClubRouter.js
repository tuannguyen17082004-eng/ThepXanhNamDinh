const express = require('express');
const router = express.Router();
const { GetAllClub, GetClubById, UpdateClub, CreateClub, DeleteClub } = require('../controllers/ClubController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', GetAllClub);
router.post('/', isLogined, isAdmined, upload.single("logo"), CreateClub);
router.get('/:id', GetClubById);
router.put('/:id', isLogined, isAdmined, upload.single("logo"), UpdateClub);
router.delete('/:id', isLogined, isAdmined, DeleteClub);

module.exports = router;