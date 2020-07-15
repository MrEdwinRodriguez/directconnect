const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Hire = require('../../models/HiringFor');
const Business = require('../../models/Business');
const Post = require('../../models/Post');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateBusinessInput = require('../../validation/business');
const validateHiringInput = require('../../validation/hiring');
const gcs = require('../../middlewares/google-cloud-storage');
const utils = require( '../../resources/utils');
var Multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
// // const storage = multer.diskStorage({
// //     destination: function (req, res, cb) {
// //         cb(null, 'uploads/')
// //     }
// // });

const multer = Multer({ 
    storage: Multer.MemoryStorage,
    // limits: {
    //   fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    // },
});


//GET API/profile
//get current users profile
//private
router.get('/', passport.authenticate('jwt', {session: false }), (req, res) => {
	const errors = {};
	var profileFound = null;
	var authUser = null;
	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'first_name', 'last_name', 'avatar'])
		.lean()
		.then(profile => {
			if(!profile){
				errors.noprofile = "There is not profile for this user";
				return res.status(404).json(errors)
			}
			let experiencesSorted = utils.sortArray(profile.experience);
			let educationSorted = utils.sortArray(profile.education);
			profile.experience = experiencesSorted;
			profile.education = educationSorted;
			profileFound = profile;
			authUser = profile.user._id;
			return Hire.find({user: authUser}).sort('position').lean().exec()
		})
		.then(positions => {
			profileFound.hiringFor = positions;
			return Business.find({user: authUser}).sort('name').lean().exec()
		})
		.then(businesses => {
			profileFound.business = businesses;
			res.json(profileFound)
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

//GET API/profile/search/:criteria
//GET  all profiles that meet criteria
//private
router.get('/search/:criteria', passport.authenticate('jwt', {session: false }), (req, res) => {
	const criteria = req.params.criteria;
	var profile_parameters = {};
	if (criteria == null || criteria == undefined) {
		return res.send(400)
    }
	let user_parameters = {
		$or: [{
			first_name : {$regex: criteria, $options: 'i'}
		},
		{
			last_name: {$regex: criteria, $options: 'i'}
		}, 
		{
			email : {$regex: criteria, $options: 'i'}
		}, 
		{
			name : {$regex: criteria, $options: 'i'}
		}
		]
	}
	return User.find(user_parameters).lean().exec()
	.then(users => {
		let included_user_ids = users.map(user => {
			return user._id;
		})	
		//search profile with parameters	
		profile_parameters = {
            $or: [{
                handle : {$regex: criteria, $options: 'i'}
            },
            {
                bio : {$regex: criteria, $options: 'i'}
            }, 
            {
                company : {$regex: criteria, $options: 'i'}
            },            
            {
                location : {$regex: criteria, $options: 'i'}
			},
			{
                skills : {$regex: criteria, $options: 'i'}
			}
            ]
		}
		let reqLink = req.headers.referer.split('/')
		if (reqLink[reqLink.length -1] != 'profiles') {
			profile_parameters.orginization = reqLink[reqLink.length -1]; 
		}
		//include users that were found by name match
		if (included_user_ids.length > 0) {
			profile_parameters.$or.push({user: {$in: included_user_ids}})
		}
		return Profile.find(profile_parameters).populate('user', ['name']).lean().exec()
		.then(profiles => {
			if(!profiles || profiles == null) {
				res.json({noprofiles: "There were no profiles found for "+criteria})
			}
			res.json(profiles)
		})
	})
	.catch(err => res.status(404).json(err));
});


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
	.catch(err => res.status(404).json(err));
})


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
	var profileFound = null;
	let authUser = null;
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar', 'email'])
		.lean()
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			let experiencesSorted = utils.sortArray(profile.experience);
			let educationSorted = utils.sortArray(profile.education);
			profile.experience = experiencesSorted;
			profile.education = educationSorted;
			profileFound = profile;
			authUser = profile.user._id;
			return Hire.find({user: authUser}).lean().exec()
		})
		.then(positions => {
			profileFound.hiringFor = positions;
			return Business.find({user: authUser}).sort('name').lean().exec()
		})
		.then(businesses => {
			profileFound.business = businesses;
			res.json(profileFound)
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
	profileFields.profileImage = req.body.profileImage ? req.body.profileImage : null;
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
	try {
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
					console.log('line 338')
					new Profile(profileFields).save().then(profile => res.json(profile))
				})
			}
		})
	} catch(err) {
		res.status(404).json({err})
	}

});

//POST API/profile/experience
//Add experience to profile
//private

router.post('/experience', passport.authenticate('jwt', {session: false }), (req, res) => {
	const { errors, isValid } = validateBusinessInput(req.body);

	// if(!isValid) {
	// 	return res.status(400).json(errors);
	// };

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
			var experience = profile.experience;
			Profile.updateOne({user: req.user.id}, { $set: { experience: experience }})
			.then(() => {
				 res.json(profile)
			  });
	})
})

//GET API/profile/experience/:exp_id
//GET  one experience 
//private
router.get('/experience/:exp_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}

			var experience = profile.experience.find(function(exp){
				if(exp._id+"" === req.params.exp_id+"") {
					return exp
				}
			})
			res.json(experience)
	})
})

//PUT API/profile/experience/:exp_id
//PUT  one experience 
//private
router.put('/experience/:exp_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	const authUser = req.user.id;
	// const { errors, isValid } = validateExperienceInput(req.body);
	// if(!isValid) {
	// 	return res.status(400).json(errors);
	// };
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			profile.experience.forEach(function(exp){
				if(exp._id+"" === req.params.exp_id+"") {
					exp.title = req.body.title;
					exp.company = req.body.company;
					exp.location = req.body.location;
					exp.description = req.body.description;
					exp.from = req.body.from;
					exp.to = req.body.to;
					exp.current = req.body.current;
				}	
			})
			console.log('updating profile: ', profile)
			let experience = profile.experience;
			Profile.updateOne({user: authUser}, { $set: { experience: experience }})
			.then(() => {
				getProfileWithAttributes(authUser)
			.then((oProfile) => {
				res.json(oProfile)
			})		
			})				
	})
	.catch(err => res.status(404).json(err))
})

//DELETE API/profile/delete/experience/:exp_id
//Delete expereince from profile
//private
router.put('/delete/experience/:exp_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	const authUser = req.user.id;
	let profileFound = null;
	Profile.findOne({user: authUser})
		.then(profile => {
			const removeIndex = profile.experience
				.map(item => item.id)
					.indexOf(req.params.exp_id);
			profile.experience.splice(removeIndex, 1);
			let experience = profile.experience;
			Profile.updateOne({user: authUser}, { $set: { experience: experience }})
			.then(() => {
				getProfileWithAttributes(authUser)
			.then((oProfile) => {
				res.json(oProfile)
			})		
			})		
	})
		.catch(err => res.status(404).json(err))
});


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
			var education = profile.education;
			Profile.updateOne({user: req.user.id}, { $set: { education: education }})
			.then(() => {
				 res.json(profile)
			  });
	})
	.catch(err => res.status(404).json(err))
})

//GET API/profile/education/:edu_id
//GET  one education
//private
router.get('/education/:edu_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}

			var education = profile.education.find(function(edu){
				if(edu._id+"" === req.params.edu_id+"") {
					return edu
				}
			})
			res.json(education)
	})
	.catch(err => res.status(404).json(err))
})

//PUT API/profile/education/:exp_id
//PUT  one education 
//private
router.put('/education/:exp_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	const authUser = req.user.id;
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}
			profile.education.forEach(function(edu){
				if(edu._id+"" === req.params.exp_id+"") {
					edu.title = req.body.title;
					edu.company = req.body.company;
					edu.location = req.body.location;
					edu.description = req.body.description;
					edu.from = req.body.from;
					edu.to = req.body.to;
					edu.current = req.body.current;
				}	
			})
			let education = profile.education;
			Profile.updateOne({user: authUser}, { $set: { education: education }})
			.then(() => {
				getProfileWithAttributes(authUser)
			.then((oProfile) => {
				res.json(oProfile)
			})		
			})	
	})
	.catch(err => res.status(404).json(err))
})

//DELETE API/profile/education/delete/:edu_id
//Delete education from profile
//private
router.put('/education/delete/:edu_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	const authUser = req.user.id;
	Profile.findOne({user: req.user.id}).populate()
		.then(profile => {
			const removeIndex = profile.education
				.map(item => item.id)
					.indexOf(req.params.edu_id);
			profile.education.splice(removeIndex, 1);
			var education = profile.education;
			Profile.updateOne({user: req.user.id}, { $set: { education: education }})
			.then(() => {
				getProfileWithAttributes(authUser)
				.then((oProfile) => {
					res.json(oProfile)
				})
			})	
	})
		.catch(err => res.status(404).json(err))
});

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


//GET API/profile/business
//GET  all businesses
//private
router.get('/businesses', passport.authenticate('jwt', {session: false }), (req, res) => {
	Profile.find({ business: { $exists: true, $ne: [] } })
		.populate('user').lean()
		.then(profiles => {
			var businesses = []
			profiles.forEach(function (profile) {
				profile.business.forEach(function(obusiness){
					obusiness.contactName = profile.user.name;
					obusiness.contactEmail = profile.user.email;
					obusiness.contactPhone = profile.phoneNumber ? profile.phoneNumber : "";
					businesses.push(obusiness)
				})
			})
			res.json(businesses)
	})
	.catch(err => res.status(404).json(err));
});

//GET API/profile/business/:bus_id
//GET  one business
//private
router.get('/business/:bus_id', passport.authenticate('jwt', {session: false }), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile found for this user";
				res.status(400). json(errors)
			}

			var business = profile.business.find(function(bus){
				if(bus._id+"" === req.params.bus_id+"") {
					return bus
				}
			})
			res.json(business)
	})
})


//DELETE API/profile
//Delete user and profile
//private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
		Post.remove({ user: req.user.id }).then(() => {
			Business.remove({ user: req.user.id }).then(() => {
				Hire.remove({ user: req.user.id }).then(() => {
					User.findOneAndRemove({ _id: req.user.id }).then(() =>
						res.json({ success: true })
					);
				});
			});
		});
    });
  });


//POST API/profile/upload
//Add experience to profile
//private
router.post('/upload',  multer.single('image'), passport.authenticate('jwt', {session: false }),  gcs.sendUploadToGCS, (req, res, next) => {
	if(req.files === null) {
		return res.status(400).json({ msg: "No File Uploaded"});
	}
	if ( req.file.cloudStorageError) {
		return res.status(400).json({ msg: "An Error occuered uploaded your file"});
	}
	const file = req.file;
	Profile.findOne({ user: req.user.id })
	.then(profile => {
		if(!profile) {
			res.json({imageURL: req.file.gcsUrl })
		}
		let oldimage = null;
		if (profile.profileImage) {
			imagePath = profile.profileImage.split('/');
			oldimage = imagePath[imagePath.length -1]

		}
		profile.profileImage = req.file.gcsUrl;
		if (oldimage != null) {
			console.log('oldimage', oldimage)
			gcs.deleteFileGCS(oldimage)
		}
		console.log('saving profile image')
		profile.save()
			.then(profile => 
			getProfileWithAttributes(profile.user)
			.then((oProfile) => {
				res.json(oProfile)
			})
				// res.json(profile)
				)
	})
	.catch(error => {
		console.error(error)
		res.status(404).json(error)
	})		

	// })
})

function getProfileWithAttributes(userId) {
	return new Promise(function(resolve, reject){
		let profileFound = null
		Profile.findOne({user: userId}).lean().exec()
		.then(profile => {
			let experiencesSorted = utils.sortArray(profile.experience);
			let educationSorted = utils.sortArray(profile.education);
			profile.experience = experiencesSorted;
			profile.education = educationSorted;
			profileFound = profile
			return Hire.find({user: userId}).lean().exec()
		})
		.then(positions => {
			profileFound.hiringFor = positions;
			return Business.find({user: userId}).lean().exec()
		})
		.then(businesses => {
			profileFound.business = businesses;
			console.log('returning profileFound', profileFound)
			return resolve(profileFound)
		})
	})
}

module.exports = router;