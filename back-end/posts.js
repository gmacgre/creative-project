const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    upvotes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    downvotes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

//make a new post
router.post('/', validUser, async (req, res) => {
    const newpost = new Post({
        user: req.user,
        title: req.body.title,
        description: req.body.description,
        upvotes: req.user,
        downvotes: [],
    });
    try {
        await newpost.save();
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return rers.sendStatus(500);
    }
});

//edit a post
router.put('/:id', validUser, async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id }).populate('user');
        post.title = req.body.newEdit.title;
        post.description = req.body.newEdit.description;
        post.upvotes = req.body.newEdit.upvotes;
        post.downvotes = req.body.newEdit.downvotes;
        await post.save();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get all posts
router.get('/all', async (req, res) => {
    try {
        let allPosts = await Post.find().sort({
            created: -1
        }).populate('user').populate('upvotes').populate('downvotes');
        return res.send(allPosts)
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//get one post
router.get('/:id', async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id }).populate('user').populate('upvotes').populate('downvotes');
        return res.send(post);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get user's posts
router.get('/', validUser, async (req, res) => {
    try {
        let posts = await Post.find({
            user: req.user
        }).sort({
            created: -1
        }).populate('user').populate('upvotes').populate('downvotes');
        return res.send(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//delete a post
router.delete('/:id', validUser, async (req, res) => {
    try {
        await Post.deleteOne({
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
    model: Post,
    routes: router,
}