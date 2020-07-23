const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');


//GET API/content/blogs
//get all blogs
//public
router.get('/blogs', passport.authenticate('jwt', {session: false }), (req, res) => {
    Profile.find({blog: {$ne: null}, hasBlog: true}).populate('user').lean().exec()
    .then(aProfiles => {
        let blogArray = [];
        aProfiles.forEach(profile => {
            let blogObject = {};
            blogObject.name = profile.blog.name;
            blogObject.link = profile.blog.link;
            blogObject.about = profile.blog.about;
            blogObject.user = profile.user.name;
            blogObject.email = profile.user.email ? profile.user.email : "";
            blogArray.push(blogObject)
        })
        res.json({blogs: blogArray})
    })
    .catch(err => res.status(404).json(err));
})

//GET API/content/podcast
//get all podcast
//public
router.get('/podcast', passport.authenticate('jwt', {session: false }), (req, res) => {
    Profile.find({podcast: {$ne: null}, hasPodcast: true}).populate('user').lean().exec()
    .then(aProfiles => {
        let podcastArray = [];
        aProfiles.forEach(profile => {
            let podcastObject = {};
            podcastObject.name = profile.podcast.name;
            podcastObject.link = profile.podcast.link;
            podcastObject.about = profile.podcast.about;
            podcastObject.user = profile.user.name;
            podcastObject.email = profile.user.email ? profile.user.email : "";
            podcastArray.push(podcastObject)
        })
        res.json({podcasts: podcastArray})
    })
    .catch(err => res.status(404).json(err));
})

module.exports = router;