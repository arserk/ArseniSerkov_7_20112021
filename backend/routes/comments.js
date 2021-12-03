const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comments');

router.post('/', commentsCtrl.createComment);
router.get('/', commentsCtrl.getAllComments);
//router.get('/:id', commentsCtrl.getOneComment);
router.delete('/:id', commentsCtrl.deleteComment);
router.put('/:id', commentsCtrl.updateComment);

module.exports = router;