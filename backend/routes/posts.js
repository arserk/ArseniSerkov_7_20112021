const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/posts');

router.post('/', auth, multer, postsCtrl.createPost);
router.get('/', postsCtrl.getNextPosts);
router.get('/:id', postsCtrl.getOnePost);
router.delete('/:id', postsCtrl.deletePost);
router.put('/:id', multer, postsCtrl.updatePost);
//router.post('/:id/like', postsCtrl.ratePost); //à implémenter

module.exports = router;