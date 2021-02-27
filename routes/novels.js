const express = require('express');
const router = express.Router();
const catchAsync =require('../utils/catchAsync')
const {isLoggedIn, isAuthor, validateNovel} = require('../middleware')
const novels = require('../controllers/novels')


router.get('/', catchAsync(novels.index))

router.get('/new',isLoggedIn, novels.renderNewForm)

router.post('/',isLoggedIn, validateNovel, catchAsync(novels.createNovel));

router.get('/:id', catchAsync(novels.showNovels));

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(novels.renderEditForm));

router.put('/:id',isLoggedIn, isAuthor, validateNovel, catchAsync(novels.updateNovel));

router.delete('/:id',isLoggedIn, isAuthor, catchAsync(novels.deleteNovel))

module.exports = router;
