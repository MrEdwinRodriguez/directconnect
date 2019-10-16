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
const validateHiringInput = require('../../validation/hiring');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
// // const storage = multer.diskStorage({
// //     destination: function (req, res, cb) {
// //         cb(null, 'uploads/')
// //     }
// // });

// // const upload = multer({ storage: storage });

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

//GET API/profile/hiring
//get all hiring positions
//private
router.get('/hiring', passport.authenticate('jwt', {session: false }), (req, res) => {
;
	Profile.find({ hiringFor: { $exists: true, $ne: [] } })
		.populate('user').lean()
		.then(profiles => {
			var hiringPositions = []
			profiles.forEach(function (profile) {
				profile.hiringFor.forEach(function(position){
					position.contactName = profile.user.name;
					position.contactEmail = profile.user.email;
					position.contactPhone = profile.phoneNumber ? profile.phoneNumber : "";
					hiringPositions.push(position)
				})

			})
			// console.log('line 65', profiles[0].hiringFor)
			res.json(hiringPositions)
	})
	.catch(err => res.status(404).json(err));
});

//GET API/hiring/:position
//get hiring position by handle
//public
router.get('/hiring/:position', (req, res) => {
	const errors = {};
	const positionQueried = req.params.position;
	var position = null;
	Profile.findOne({ "hiringFor": { $elemMatch: { _id: positionQueried } } })
		.populate('user', ['name', 'avatar', 'email'])
		.lean()
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no position found";
				res.status(400). json(errors)
			}
			position = profile.hiringFor.find(function (hiring){
				if(hiring._id == positionQueried) {
					return hiring
				}
			})

			position.contactName = profile.user.name;
			position.email = profile.user.email;
			position.phoneNumber = profile.phoneNumber;
			res.json(position)
		})
		.catch(err => res.status(404).json(err));

});
//GET API/profile/hiring/orginization/:orginization
//get profile by orginization
//public
router.get('/hiring/orginization/:orginization', passport.authenticate('jwt', {session: false }), (req, res) => {
	const errors = {};
	
	Profile.find({ hiringFor: { $exists: true, $ne: [] }, orginization: req.params.orginization })
		.populate('user').lean()
		.then(profiles => {
			if(!profiles) {
				errors.noprofile = "There are no positions for this orginization";
				res.status(400). json(errors)
			}
			var hiringPositions = []
			profiles.forEach(function (profile) {
				profile.hiringFor.forEach(function(position){
					position.contactName = profile.user.name;
					position.contactEmail = profile.user.email;
					position.contactPhone = profile.phoneNumber ? profile.phoneNumber : "";
					hiringPositions.push(position)
				})
	
			})
				// console.log('line 65', profiles[0].hiringFor)
			res.json(hiringPositions)
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

//POST API/profile/hiring
//Add position hiring to profile
//private
router.post('/hiring', passport.authenticate('jwt', {session: false }), (req, res) => {
	const { errors, isValid } = validateHiringInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			console.log('line 271', req.body.frequency)

			if(req.body.frequency === "yearly") {
				req.body.pay = req.body.pay +"/year";
			} else if (req.body.frequency === "hourly") {
				req.body.pay = req.body.pay +"/hour";
			} else if (req.body.frequency === "internship") {
				req.body.pay = req.body.pay +"/ Internship/No Pay";
			} else {
				req.body.pay = req.body.pay + " One time Payment";
			}

			const newPosition = {
				company: req.body.company,
				position: req.body.position,
				description: req.body.description,
				location: req.body.location,
				pay: req.body.pay,
				frequency: req.body.frequency,
			}
			profile.hiringFor.unshift(newPosition);
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

//DELETE API/profile/hiring/:hire_id
//Delete position for hiring
//private

router.delete('/hiring/:hire_id', passport.authenticate('jwt', {session: false }), (req, res) => {

	Profile.findOne({user: req.user.id})
		.then(profile => {
			const removeIndex = profile.hiringFor
				.map(item => item.id)
					.indexOf(req.params.hire_id);

			profile.hiringFor.splice(removeIndex, 1);
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


//POST API/profile/upload
//Add experience to profile
//private
router.post('/upload', passport.authenticate('jwt', {session: false }), (req, res) => {
	if(req.files === null) {
		return res.status(400).json({ msg: "No File Uploaded"});
	}
console.log(req.files.file.name)
	const file = req.files.file;
	file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, err => {
		if (err) {
		  console.error(err);
		  return res.status(500).send(err);
		}

		Profile.findOne({ user: req.user.id })
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			
			profile.profileImage = req.files.file.name;
			profile.save()
				.then(profile => res.json({ fileName: file.name, filePath: `/uploads/${file.name}` }))
	})		

})


})

module.exports = router;