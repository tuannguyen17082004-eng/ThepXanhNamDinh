const express = require('express');
const router = express.Router();
const { GetAllNews, GetNewsById, CreateNews, UpdateNews, DeleteNews } = require('../controllers/NewsController');
const isLogined = require('../middleware/isLogin');
const isAdmined = require('../middleware/isAdmin');
const upload = require('../config/multer_config');

router.get('/', GetAllNews);
router.post('/', isLogined, isAdmined, upload.single("img"), CreateNews);
router.get('/:id', GetNewsById);
router.put('/:id', isLogined, isAdmined, upload.single("img"), UpdateNews);
router.delete('/:id', isLogined, isAdmined, DeleteNews);

module.exports = router;