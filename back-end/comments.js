const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const users = require("./users.js");
const posts = require('./posts.js');
const Post = posts.model;
const User = users.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    comment: String,
    upvotes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    downvotes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    created: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

//make a new comment
router.post('/', validUser, async (req, res) => {
    const newcomment = new Comment({
        post: req.post,
        user: req.user,
        comment: req.body.description,
        upvotes: req.user,
        downvotes: [],
    });
    try {
        await newcomment.save();
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//edit a comment
router.put('/:postid/:commentid', validUser, async (req, res) => {
    try {
        let comment = await Comment.findOne({ _id: req.params.commentid });
        comment.comment = req.body.newEdit.comment;
        comment.upvotes = req.body.newEdit.upvotes;
        comment.downvotes = req.body.newEdit.downvotes;
        await comment.save();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get one post's comment
router.get('/:postid', async (req, res) => {
    try {
        let comments = await Comment.find({ post: req.params.postid }).populate('user').populate('upvotes').populate('downvotes');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//delete a comment
router.delete('/:id', validUser, async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}