const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//Load Input Validation
const validateRegistrationInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Chapter = require('../../models/Chapter');
const Orginization = require('../../models/Orginization');
const mailer = require('../../controllers/emails');
const authController = require('../../controllers/auth-controller');

router.get('/test', (req,res) => res.json({msg: "Users works"}));

//GET API/users/register
//register user
//public

router.post('/register', (req, res) => {
	console.log('in /register')
	const { errors, isValid } = validateRegistrationInput(req.body);
	let chapter = null;
	let email = null;
	//check Validation
	if(!isValid) {
		return res.status(400).json(errors);
	};

	inviteCodeArray = ['iotarho1978', 'sigmaepsilon1978', "gammadeltasigma1951", "epsilonepsilonzeta1954"]
	let inviteCodeEntered = req.body.inviteCode.toLowerCase()

	if (inviteCodeArray.indexOf(inviteCodeEntered) == -1) {
		return res.status(400).json(errors.name = "Enter a Valid Invite Code")
	}
	Chapter.findOne({invite_code : inviteCodeEntered }).lean().exec()
	.then(oChapter => {
		chapter = oChapter;
		email = req.body.email.toLowerCase()
		return User.findOne({email : email })
	}).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', //size
				r: 'pg', //rating
				d: 'mm', //Default
			});
			const newUser = new User({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				orginization: chapter.orginization,
				chapter: [chapter._id],
				name: req.body.first_name + " " + req.body.last_name,
				email: email,
				inviteCode: inviteCodeEntered,
				avatar,
				password: req.body.password
			})

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => {
							mailer.welcomeEmail(user)
							res.json(user)
						})
						.catch(err => console.log(err));
				})
			})
		}
	})
});

//POST API/users/login
//login user / return JWT token
//public
router.post('/login', (req, res) => {
	
	const { errors, isValid } = validateLoginInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};

	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	let authUser = null;
	let authProfile = null;
	User.findOne({email: email})
	.then(user => {
		if (!user) {
			errors.email = "User not found";
			return res.status(404).json(errors);
		}
		authUser = user;
		return Profile.findOne({user: authUser._id}).lean().exec()
	})
	.then(profile => {
		authProfile  = profile
		bcrypt.compare(password, authUser.password)
			.then(isMatch => {
				if(isMatch) {
					//user Matched
					const payload = { 
						id: authUser._id, 
						first_name: authUser.first_name,
						last_name: authUser.last_name,
						inviteCode: authUser.inviteCode,
						profileHandle: authProfile && authProfile.handle ? authProfile.handle : null,
						profileImage : authProfile && authProfile.profileImage ? authProfile.profileImage : null ,
					};
					//Sign Token
					jwt.sign(
						payload, 
						keys.secretOrKey, 
						{expiresIn: 72000},
						(err, token) => {
							res.json({
								success: true,
								token: 'Bearer ' + token
							});

						});
				} else {
					errors.password = "password incorrect";
					return res.status(400).json(errors);
				}
			})
	})
})

//PUT API/users/update
//put user profiles
//private
router.put('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log(req.user)
	let authUser = null;
	
	try {
		User.findOne({_id: req.user._id})
		.then(user => {
			if(!user) {
				errors.nouser = "There is no user found.";
				res.status(400). json(errors)
			}
			user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.name = req.body.name;
			if(!user.email_permissions) user.email_permissions = {};
			user.email_permissions.fullNetworkNotification = req.body.fullNetworkNotification;
			user.email_permissions.chapterNotification = req.body.chapterNotification,
			user.email_permissions.localChaptersNotification = req.body.localChaptersNotification,
			user.email_permissions.commentNotification = req.body.commentNotification,

			console.log('saving user account update')
			user.save()
				.then(user => {
					authUser = user
					authController.getProfile(user._id)
				.then(profile => {		
					res.json({
						updated: true, 
						id: authUser._id,
						name: authUser.name,
						first_name: authUser.first_name,
						last_name: authUser.last_name,
						email: authUser.email,
						profileHandle: profile && profile.handle ? profile.handle : null ,
						profileImage : profile && profile.profileImage ? profile.profileImage : null ,
						commentNotification: authUser.email_permissions && authUser.email_permissions.commentNotification != null && authUser.email_permissions.commentNotification != undefined ? authUser.email_permissions.commentNotification : true,
						chapterNotification: authUser.email_permissions && authUser.email_permissions.chapterNotification != null && authUser.email_permissions.chapterNotification != undefined ? authUser.email_permissions.chapterNotification : true,
						localChaptersNotification: authUser.email_permissions && authUser.email_permissions.localChaptersNotification != null && authUser.email_permissions.localChaptersNotification != undefined ? authUser.email_permissions.localChaptersNotification : true,
						fullNetworkNotification: authUser.email_permissions && authUser.email_permissions.fullNetworkNotification != null && authUser.email_permissions.fullNetworkNotification != undefined  ? authUser.email_permissions.fullNetworkNotification : true, 
					});
					})
				})
			// 	return Profile.findOne({user: user._id}).populate('user').exec()
			// })
			// .then(profile => res.json(profile))
		})
	}
	catch (err) {
		res.status(500).send(err+"")
	}
});

//GET API/users/current
//return current user
//private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	let profile = null;
	Profile.findOne({user: req.user.id}).exec()
	.then(foundProfile => {
		if(foundProfile) profile = foundProfile
	return User.findOne({_id: req.user.id}).exec()
	}).then(user => {
		if (!user) { 
			errors.nouser = "There is no user found.";
			res.status(400). json(errors)
		}

		res.json({
			id: user._id,
			name: user.name,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			profileHandle: profile && profile.handle ? profile.handle : null ,
			profileImage : profile && profile.profileImage ? profile.profileImage : null ,
			commentNotification: user.email_permissions && user.email_permissions.commentNotification != null && user.email_permissions.commentNotification != undefined ? user.email_permissions.commentNotification : true,
			chapterNotification: user.email_permissions && user.email_permissions.chapterNotification != null && user.email_permissions.chapterNotification != undefined ? user.email_permissions.chapterNotification : true,
			localChaptersNotification: user.email_permissions && user.email_permissions.localChaptersNotification != null && user.email_permissions.localChaptersNotification != undefined ? user.email_permissions.localChaptersNotification : true,
			fullNetworkNotification: user.email_permissions && user.email_permissions.fullNetworkNotification != null && user.email_permissions.fullNetworkNotification != undefined  ? user.email_permissions.fullNetworkNotification : true, 
		});
	});	
});

//GET API/users/current
//reset password
//public
router.post('/forgot_password', (req, res) => {
	const userEmail = req.body.email;
	authController.getToken()
	.then((token) => {
		return User.findOne({email : userEmail }).exec()
	.then((oUser) => {
		console.log(oUser)
		if (!oUser) {
			return req.json({'error': 'We do not have an account with this email'})
		}
       	oUser.resetPasswordToken = token;
		oUser.resetPasswordExpires = Date.now() + 3600000;   
		oUser.save((err, user) => {
			const host = req.headers['x-forwarded-host'];
			mailer.forgotPassword(user, host)
			.then((message) =>{
			console.log('in forgot_password', user)
			res.json(message)
			})
			.catch((error) => {
				return res.status(500).send(error)
			})
		})
	})

	})

})

router.put('/reset/:token', (req, res) => {
	console.log('in reset endpoint', req.body)
	const token = req.params.token;
	const password = req.body.password;
	const password2 = req.body.password2
	try {
		if (password != password2 ) {
			req.json({'error': 'passwords do no match'})
		}
		User.findOne({resetPasswordToken: token})
		.then(user => {
			if (!user) {
				return res.json({'error': 'This token is not valid'})
			}
			const currentTime = new Date();
			if (currentTime > user.resetPasswordExpires) {
				console.log('token is expired')
				return res.json({'error': 'Token has expired'})
			} else {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						if (err) throw err;
						user.password = hash;
						user.save()
							.then(user => {
								if (err) throw err;
								mailer.passwordReset(user)
								console.log('succesfully changed password')
								res.json({succesfull: 'password has been reset'})
							})
							.catch(err => console.log(err));
					})
				})
			}
		})
	}
	catch (error) {
		res.status(500).send(error+"")
	}
})

router.put('/account_reset_password', (req, res) => {
	console.log('in account reset password')
	const currentPassword = req.body.currentPassword;
	const newPassword = req.body.newPassword;
	const newPasswordConfirm = req.body.newPasswordConfirm
	let errors = {};
	try {
		if (newPassword != newPasswordConfirm ) {
			req.json({'error': 'passwords do no match'})
		}
		User.findOne({_id: req.body.id})
		.then(user => {
			if (!user) {
				return res.json({'error': 'user not found'})
			}
			bcrypt.compare(currentPassword, user.password)
			.then(isMatch => {
				if(isMatch) {
					//user Matched
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newPassword, salt, (err, hash) => {
							if (err) throw err;
							user.password = hash;
							user.save()
								.then(user => {
									mailer.passwordReset(user)
									let userObject = authController.sanitizeUserObject(user)
									authController.getProfile((user._id))
									.then(profile => {
										userObject.profileHandle = profile.handle;
										userObject.profileImage = profile.profileImage;
										res.status(200).json({user: userObject, updated: true})
									})
								})
								.catch(err => console.log(err));
						})
					})
				} else {
					errors.password = "Current password incorrect";
					return res.status(400).json(errors);
				}
			})
		})
	}
	catch (error) {
		res.status(500).send(error+"")
	}
})
module.exports = router;
