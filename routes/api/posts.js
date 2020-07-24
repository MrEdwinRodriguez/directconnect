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
  console.log('in get post')
  let postFound = null;
  Post.findById(req.params.id)
    .populate('user')
    .lean()
    .then(post => {
      postFound = post;
      let userIds = [post.user._id];
      post.comments.forEach(function(comment){
        if (userIds.indexOf(comment.user+"") == -1) {
          userIds.push(comment.user+"");
        }
      })
      console.log('searching for profiles with ids: ', userIds)
      return Profile.find({user: {$in: userIds }}).populate('user').lean().exec()
    })
    .then(profiles => {
      var userObject = {};
      profiles.forEach(function(profile) {
        let user = profile.user._id ? profile.user._id : profile.user;
        userObject[user]= profile;
      })
      postFound.comments.forEach(function(comment) {
        if (userObject[comment.user]) {
          comment.profile = userObject[comment.user];
          comment.user = userObject[comment.user].user;
        }
      })
      if(userObject[postFound.user._id]){
        postFound.profile = userObject[postFound.user._id];
      }
      res.json(postFound)
    })
    .catch(err =>
      res.status(404).json(err)
    );
});

//POST API/post
//create post
//private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//PUT API/post
//edit post
//private
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if(!post) {
          errors.noprofile = "No post was found";
          res.status(400). json(errors)
        }
        post.text = req.body.text
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
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
  console.log('commenting on a post')
  let postFound = null;
	const { errors, isValid } = validatePostInput(req.body);
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
			post.save().then(post => {
        return Post.findOne({_id: post._id}).populate('user').lean().exec()
      })
      .then(post => {
        console.log('line 205')
        postFound = post;
        let userIds = [post.user._id];
        post.comments.forEach(function(comment){
          if (userIds.indexOf(comment.user+"") == -1) {
            userIds.push(comment.user+"");
          }
        })
        console.log('searching for profiles with ids: ', userIds)
        return Profile.find({user: {$in: userIds }}).populate('user').lean().exec()
      })
      .then(profiles => {
        var userObject = {};
        profiles.forEach(function(profile) {
          let user = profile.user._id ? profile.user._id : profile.user;
          userObject[user]= profile;
        })
        postFound.comments.forEach(function(comment) {
          if (userObject[comment.user]) {
            comment.profile = userObject[comment.user];
            comment.user = userObject[comment.user].user;
          }
        })
        if(userObject[postFound.user._id]){
          postFound.profile = userObject[postFound.user._id];
        }
        console.log('line 231', postFound)
        res.json(postFound)
      })
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