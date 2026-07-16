const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/VideoController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');
const { GetAllVideos, GetVideoById, SearchVideo, CreateVideo, UpdateVideo, DeleteVideo } = VideoController;

router.get('/', GetAllVideos);
router.get('/search-video', SearchVideo);
router.get('/:id', isLogined, GetVideoById);
router.post('/', isLogined, isAdmined, upload.fields([
    { name: "link", maxCount: 1 },
    { name: "poster", maxCount: 1 }
]), CreateVideo);
router.put('/:id', isLogined, isAdmined, upload.fields([
    { name: "link", maxCount: 1 },
    { name: "poster", maxCount: 1 }
]), UpdateVideo);
router.delete('/:id', isLogined, isAdmined, DeleteVideo);

module.exports = router;