const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comments');

router.post('/', auth, commentsCtrl.createComment);
router.get('/', commentsCtrl.getAllComments);
//router.get('/:id', commentsCtrl.getOneComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);
router.put('/:id', auth, commentsCtrl.updateComment);

module.exports = router;