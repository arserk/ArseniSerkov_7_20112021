const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            username: req.body.username,
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash
        })
        .then(() => res.status(201).json({ message: 'New user created' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            res.status(200).json({
                userId: user.id,
                username: user.username,
                fullName: user.fullName,
                isAdmin: user.isAdmin,
                token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_PASS', { expiresIn: '24h' })
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//PUT methods
exports.updateUserInfo = (req, res) => {
    User.update(req.body, { where: { id: req.params.id }})
    .then(() => {
        res.status(200).json({ message: `user info updated`});
    })
    .catch(error => res.status(400).json({ error }));
};

exports.changePwd = (req, res, next) => {

};

//DELETE method
exports.deleteUser = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
    .then(user => {
        User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: `user account of ${user.username} deleted`}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//find one user info
exports.getUser = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
    .then(user => {
        res.status(200).json({ user });
    })
    .catch(err => res.status(404).json({ err }));
};

//test get 
exports.getAll = (req, res) => {
    User.findAll()
    .then(users => {
        //console.log(users);
        res.status(200).json({ users });
    })
    .catch(err => console.log(err));
};