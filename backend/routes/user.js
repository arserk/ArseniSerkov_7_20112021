const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.updateUserInfo);
router.delete('/:id', userCtrl.deleteUser);


router.get('/', userCtrl.getAll);

module.exports = router;