const Post = require('../models/Post');
const { Op } = require('sequelize');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    if (!req.file) {
        Post.create({
            ...postObject
        })
        .then(() => res.status(201).json({ message: 'New post created' }))
        .catch(error => res.status(400).json({ error }));
    }
    else if (req.file) {
        Post.create({
            ...postObject,
            mediaURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(() => res.status(201).json({ message: 'New post with image created' }))
        .catch(error => res.status(400).json({ error }));
    }
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

//only display last 10, logic to update
exports.getNextPosts = (req, res, next) => {
    Post.findAll({ limit: 10, order: [['createdAt', 'DESC']]})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
    .then(post => {
        if (post.mediaURL) {
        const filename = post.mediaURL.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where:  { id: req.params.id } })
            .then(() => res.status(200).json({ message: `Post "${post.title}" with image deleted` }))
            .catch(error => res.status(400).json({ error }));
       });
        }
        else {
            Post.destroy({ where:  { id: req.params.id } })
            .then(() => res.status(200).json({ message: `Post "${post.title}" deleted` }))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};

//modify a post, not yet implemented
exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post)
        //mediaUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body.post };
    //console.log(postObject);
    let deleteMsg = '';
    if (req.file) {
        Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (error => {
                if (error) res.status(400).json({ error });
                else deleteMsg = " & Previous image deleted";
            }));
        })
        .catch(error => res.status(500).json({ error }));
    }
    Post.update( postObject,  { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Post changed' + deleteMsg} ))
    .catch(error => res.status(400).json({ error }));
};

//logic for posts ratings, not yet implemented
exports.ratePost = (req, res, next) => {
    const userId = req.body.userId;
    if (req.body.like === 0) {
        Post.findOne({ id: req.params.id })
        .then(post => {
            if (post.usersLiked.find(user => user == userId)) {
                Post.updateOne({ id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userId }})
                .then(() => res.status(200).json({ message: 'Like removed' }))
                .catch(error => res.status(400).json({ error }));
            }
            else if (post.usersDisliked.find(user => user == userId)) {
                Post.updateOne({ id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId }})
                .then(() => res.status(200).json({ message: 'Dislike removed' }))
                .catch(error => res.status(400).json({ error }));
            }
            else error => res.status(500).json({ error });
        })
        .catch(error => res.status(500).json({ error }));
    }
    else if (req.body.like === 1) {
        Post.updateOne({ id: req.params.id }, { $inc: { likes: 1 }, $addToSet: { usersLiked: userId }})
        .then(() => res.status(200).json({ message: 'Post liked by user' }))
        .catch(error => res.status(400).json({ error }));
    }
    else if (req.body.like === -1) {
        Post.updateOne({ id: req.params.id }, { $inc: { dislikes: 1 }, $addToSet: { usersDisliked: userId }})
        .then(() => res.status(200).json({ message: 'Post disliked by user' }))
        .catch(error => res.status(400).json({ error }));
    }
};