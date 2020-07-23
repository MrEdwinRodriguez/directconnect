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
            blogObject.profileId =  profile._id;
            blogObject.email = profile.user.email ? profile.user.email : "";
            blogArray.push(blogObject)
        })
        res.json({blogs: blogArray})
    })
    .catch(err => res.status(404).json(err));
})

//GET API/content/blog/:profile_id
//GET  one hire
//private
router.get('/blog/:profile_id', passport.authenticate('jwt', {session: false }), (req, res) => {
    const profileId = req.params.profile_id;
	Profile.findOne({_id: profileId}).populate('user').lean().exec()
		.then(profile => {
			if(!profile || !profile.hasBlog) {
				errors.noposition = "no blog was found";
				res.status(400). json(errors)
			}
            let blog = {};
            blog.name = profile.blog.name;
            blog.link = profile.blog.link;
            blog.about = profile.blog.about;
            blog.user = profile.user.name;
            blog.profileId =  profile._id;
            blog.email = profile.user.email ? profile.user.email : "";
            res.json({blog})
	})
	.catch(err => res.status(404).json(err))
})
    

//GET API/content/podcasts
//get all podcast
//public
router.get('/podcasts', passport.authenticate('jwt', {session: false }), (req, res) => {
    Profile.find({podcast: {$ne: null}, hasPodcast: true}).populate('user').lean().exec()
    .then(aProfiles => {
        let podcastArray = [];
        aProfiles.forEach(profile => {
            let podcastObject = {};
            podcastObject.name = profile.podcast.name;
            podcastObject.link = profile.podcast.link;
            podcastObject.about = profile.podcast.about;
            podcastObject.user = profile.user.name;
            podcastObject.profileId =  profile._id;
            podcastObject.email = profile.user.email ? profile.user.email : "";
            podcastArray.push(podcastObject)
        })
        res.json({podcasts: podcastArray})
    })
    .catch(err => res.status(404).json(err));
})

//GET API/content/podcast/:profile_id
//GET one podcast
//private
router.get('/podcast/:profile_id', passport.authenticate('jwt', {session: false }), (req, res) => {
    const profileId = req.params.profile_id;
	Profile.findOne({_id: profileId}).populate('user').lean().exec()
		.then(profile => {
			if(!profile || !profile.hasPodcast) {
				errors.noposition = "no blog was found";
				res.status(400). json(errors)
			}
            let podcast = {};
            podcast.name = profile.podcast.name;
            podcast.link = profile.podcast.link;
            podcast.about = profile.podcast.about;
            podcast.user = profile.user.name;
            podcast.profileId =  profile._id;
            podcast.email = profile.user.email ? profile.user.email : "";
            res.json({podcast})
	})
	.catch(err => res.status(404).json(err))
})
module.exports = router;