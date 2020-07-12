const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

router.get('/test', (req,res) => res.json({msg: "Posts works"}));

// GET api/posts
// Get posts
// Public
router.get('/', (req, res) => {
  console.log('in get posts')
  let postsFound = null;
  Post.find()
    .populate('user')
    .sort({ date: -1 })
    .lean()
    .exec()
    .then(posts => {
      postsFound = posts;
      var userIds = [];
      posts.forEach(function(post){
        if (userIds.indexOf(post.user._id+"") == -1) {
          let userId = post.user && post.user._id ? post.user._id : post.user;
          userIds.push(userId+"");
        }
      })
      console.log('searching for user ids', userIds)
      return Profile.find({user: {$in: userIds }}).lean().exec()
    })
    .then(profiles => {
     
      var userObject = {};
      profiles.forEach(function(profile) {
        let user = profile.user;
        userObject[user]= profile;
      })
      console.log('line 34', userObject)
      postsFound.forEach(function(post) {
        if (userObject[post.user._id]) {
          post.profile = userObject[post.user._id];
        }
      });
      res.json(postsFound)
    })
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// GET api/posts/:id
// Get post by id
// Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

//POST API/post
//create post
//private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log('line 72')
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    console.log('line 80')
    newPost.save().then(post => res.json(post));
  }
);

// DELETE api/posts/:id
// Delete post
// Private
router.delete( '/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// Post api/posts/like/:id
// like post
// Private
router.post( '/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
       		if ( post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this post' });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// Post api/posts/unlike/:id
// unlike post
// Private
router.post( '/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
       		if ( post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post' });
          }
          const removeIndex = post.likes
          	.map(item => item.user.toString())
          	.indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// Post api/posts/comment/:id
// comment on a post
// Private
router.post( '/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			}
			post.comments.unshift(newComment)
			post.save().then(post => res.json(post))
		})
		.catch(err => res.status(400).json({postnotfound: "No post found"}))
  
  });

// DELATE api/posts/comment/:id/:comment_id
// remove a comment from a  post
// Private
router.delete( '/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
		if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
			return res.status(404).json({commentnotexist: "Comment does not exist"})
		}
		const removeIndex = post.comments
			.map(item => item._id.toString())
			.indexOf(req.params.comment_id);

		post.comments.splice(removeIndex, 1);
		post.save().then(post => res.json(post));
		})
		.catch(err => res.status(400).json({postnotfound: "No post found"}))
  
  });
module.exports = router;