const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/VideoController');
const isLogined = require('../middleware/isLogin');
const { GetAllVideos, GetVideoById, CreateVideo, UpdateVideo, DeleteVideo } = VideoController;

router.get('/', GetAllVideos);
router.get('/:id', isLogined, GetVideoById);
router.post('/', isLogined, CreateVideo);
router.put('/:id', isLogined, UpdateVideo);
router.delete('/:id', isLogined, DeleteVideo);

module.exports = router;