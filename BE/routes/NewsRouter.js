const express = require('express');
const router = express.Router();
const { GetAllNews, GetNewsById, CreateNews, UpdateNews, DeleteNews } = require('../controllers/NewsController');

router.get('/', GetAllNews);
router.post('/', CreateNews);
router.get('/:id', GetNewsById);
router.put('/:id', UpdateNews);
router.delete('/:id', DeleteNews);

module.exports = router;