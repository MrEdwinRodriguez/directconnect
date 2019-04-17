const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');

router.get('/test', (req,res) => res.json({msg: "Profile works"}));

//GET API/profile
//get current users profile
//private
router.get('/', passport.authenticate('jwt', {session: false }), (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = "There is not profile for this user";
				return res.status(404).json(errors)
			}
			res.json(profile)
	})
	.catch(err => res.status(404).json(err));
});


//POST API/profile
//create or edit user profile
//private
router.post('/', passport.authenticate('jwt', {session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};

	const profileFields = {};
	profileFields.user = req.user.id;
	profileFields.handle = req.body.handle ? req.body.handle : null;
	profileFields.company = req.body.company ? req.body.company : null;
	profileFields.location = req.body.location ? req.body.location : null;
	profileFields.website = req.body.website ? req.body.website : null;
	profileFields.bio = req.body.bio ? req.body.bio : null;
	profileFields.status = req.body.status ? req.body.status : null;
	profileFields.githubusername = req.body.githubusername ? req.body.githubusername : null;
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}
	profileFields.social = {}
	profileFields.social.youtube = req.body.youtube ? req.body.youtube : null;
	profileFields.social.facebook = req.body.facebook ? req.body.facebook : null;
	profileFields.social.twitter = req.body.twitter ? req.body.twitter : null;
	profileFields.social.linkedin = req.body.linkedin ? req.body.linkedin : null;
	profileFields.social.instagram = req.body.instagram ? req.body.instagram : null;

	Profile.findOne({user: req.user.id}).then(profile => {
		if(profile) {
			Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
				).then(profile => res.json(profile));
		} else {
			//create
			Profile.findOne({handle: profileFields.handle}).then(profile => {
				if(profile) {
					errors.handle = "That handle already exists";
					return res.status(400).json(errors);
				}
				new Profile(profileFields).save().then(profile => res.json(profile))
			})
		}
	})



















});

module.exports = router;