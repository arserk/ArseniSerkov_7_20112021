const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
    Comment.create({ ...req.body})
    .then(() => res.status(201).json({ message: 'New comment added' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({order: [['createdAt', 'DESC']]})
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

//only gets last 5 comments, to update to find next 5
exports.getNextComments = (req, res, next) => {
    Comment.findAll({ limit: 5, order: [['createdAt', 'DESC']]})
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where:  { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Comment deleted' }))
    .catch(error => res.status(400).json({ error }));
};

//logic to modify comment, not yet implemented
exports.updateComment = (req, res, next) => {
    const commentObject = { ...req.body };
    Comment.update( commentObject,  { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'comment modified' } ))
    .catch(error => res.status(400).json({ error }));
};