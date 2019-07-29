const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateBusinessInput = require('../../validation/business');

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

//GET API/profile/all
//get all profiles
//public
router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if(!profiles) {
				errors.noprofile = "There are no profiles";
				return res.status(404).json(errors)
			}
			return res.json(profiles)
		})
		.catch(err => res.status(404).json({profile: "There is no profiles"}));
});

//GET API/profile/orginization/:orginization
//get profile by orginization
//public
router.get('/orginization/:orginization', (req, res) => {
	const errors = {};

	Profile.find({ orginization: req.params.orginization })
		.populate('user', ['name', 'avatar', 'email'])
		.then(profiles => {
			if(!profiles) {
				errors.noprofile = "There are no profiles for this orginization";
				res.status(400). json(errors)
			}
			res.json(profiles)
		})
		.catch(err => res.status(404).json(err));

});

//GET API/profile/handle/:handle
//get profile by handle
//public
router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar', 'email'])
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			res.json(profile)
		})
		.catch(err => res.status(404).json(err));

});

//GET API/profile/user/:user_id
//get profile by ID
//public
router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			res.json(profile)
		})
		.catch(err => res.status(404).json({profile: "There is no profile for this user"}));

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
	profileFields.phoneNumber= req.body.phoneNumber? req.body.phoneNumber: null;
	profileFields.title = req.body.title ? req.body.title : null;
	profileFields.orginization = req.body.orginization ? req.body.orginization: null;
	profileFields.chapter = req.body.chapter? req.body.chapter: null;
	profileFields.githubusername = req.body.githubusername ? req.body.githubusername : null;
	profileFields.lookingFor = req.body.lookingFor ? req.body.lookingFor : null;
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

//POST API/profile/experience
//Add experience to profile
//private

router.post('/experience', passport.authenticate('jwt', {session: false }), (req, res) => {
	const { errors, isValid } = validateBusinessInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};

	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			}
			profile.experience.unshift(newExp);
			profile.save()
				.then(profile => res.json(profile))
	})
})

//POST API/profile/education
//Add education to profile
//private

router.post('/education', passport.authenticate('jwt', {session: false }), (req, res) => {
	const { errors, isValid } = validateEducationInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};

	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			}
			profile.education.unshift(newEdu);
			profile.save()
				.then(profile => res.json(profile))
	})
})

//POST API/profile/business
//Add business to profile
//private
router.post('/business', passport.authenticate('jwt', {session: false }), (req, res) => {
	const { errors, isValid } = validateBusinessInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			console.log('line 241d', req.body.name)
			console.log('line 242d', req.body)
			const newBusiness = {
				name: req.body.name,
				title: req.body.title,
				description: req.body.description,
				location: req.body.location,
				website: req.body.website,
			}
			profile.business.unshift(newBusiness);
			profile.save()
				.then(profile => res.json(profile))
	})
})

//DELETE API/profile/experience/:exp_id
//Delete expereince from profile
//private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false }), (req, res) => {

	Profile.findOne({user: req.user.id})
		.then(profile => {
			const removeIndex = profile.experience
				.map(item => item.id)
					.indexOf(req.params.exp_id);

			profile.experience.splice(removeIndex, 1);
			profile.save()
				.then(profile => res.json(profile))		
	})
		.catch(err => res.status(404).json(err))
});

//DELETE API/profile/education/:exp_id
//Delete education from profile
//private

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false }), (req, res) => {

	Profile.findOne({user: req.user.id})
		.then(profile => {
			const removeIndex = profile.education
				.map(item => item.id)
					.indexOf(req.params.edu_id);

			profile.education.splice(removeIndex, 1);
			profile.save()
				.then(profile => res.json(profile))		
	})
		.catch(err => res.status(404).json(err))
});

//DELETE API/profile
//Delete user and profile
//private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  });
module.exports = router;