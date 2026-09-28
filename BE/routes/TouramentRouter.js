const express = require('express');
const router = express.Router();
const { GetAllTourament, GetTouramentById, UpdateTourament, CreateTourament, DeleteTourament } = require('../controllers/TouramentController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', GetAllTourament);
router.post('/', isLogined, isAdmined, upload.single("tourament"), CreateTourament);
router.get('/:id', GetTouramentById);
router.put('/:id', isLogined, isAdmined, upload.single("tourament"), UpdateTourament);
router.delete('/:id', isLogined, isAdmined, DeleteTourament);

module.exports = router;