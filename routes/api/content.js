const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');


//GET API/content/blogs
//get all blogs
//private
router.get('/blogs', passport.authenticate('jwt', {session: false }), (req, res) => {
    Profile.find({blog: {$ne: null}}).populate('user').lean().exec()
    .then(aProfiles => {
        let blogArray = [];
        aProfiles.forEach(profile => {
            let blogObject = {};
            blogObject.blog = profile.blog;
            blogObject.user = profile.user.name;
            blogObject.email = profile.user.email ? profile.user.email : "";
            blogArray.push(blogObject)
        })
        res.json({blogs: blogArray})
    })
    .catch(err => res.status(404).json(err));
})

module.exports = router;