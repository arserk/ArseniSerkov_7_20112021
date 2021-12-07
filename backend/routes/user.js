const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.updateUserInfo);
router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/:id', userCtrl.getUser);


router.get('/', userCtrl.getAll);

module.exports = router;