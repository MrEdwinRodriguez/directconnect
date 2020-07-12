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
const mailer = require('../../controllers/emails');
const authController = require('../../controllers/auth-controller');

router.get('/test', (req,res) => res.json({msg: "Users works"}));

//GET API/users/register
//register user
//public

router.post('/register', (req, res) => {
	console.log('in /register')
	const { errors, isValid } = validateRegistrationInput(req.body);

	//check Validation
	if(!isValid) {
		return res.status(400).json(errors);
	};

	inviteCodeArray = ['iotarho1978', 'sigmaepsilon1978', "gammadeltasigma1951", "epsilonepsilonzeta1954"]
	if (inviteCodeArray.indexOf(req.body.inviteCode) == -1) {
		return res.status(400).json(errors.name = "Enter a Valid Invite Code")
	}

	let email = req.body.email.toLowerCase()
	User.findOne({email : email })
	.then(user => {
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
				name: req.body.first_name + " " + req.body.last_name,
				email: email,
				inviteCode: req.body.inviteCode,
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
	User.findOne({email})
	.then(user => {
		if (!user) {
			errors.email = "User not found";
			return res.status(404).json(errors);
		}
		bcrypt.compare(password, user.password)
			.then(isMatch => {
				if(isMatch) {
					//user Matched
					const payload = { 
						id: user.id, 
						first_name: user.first_name,
						last_name: user.last_name,
						inviteCode: user.inviteCode
					};
					//Sign Token
					jwt.sign(
						payload, 
						keys.secretOrKey, 
						{expiresIn: 3600},
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
			console.log('saving user account update')
			user.save()
			// .then(user => {
				.then(user => res.json(user))
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
	let first_name = null;
	let last_name = null;
	console.log('line 164', req.user)
	if (req.user.name && !req.user.first_name) {
		let splitName = req.user.name.split(" ");
		first_name = splitName[0];
		last_name = splitName[1];
	}
	console.log('line 164', req.user)
	res.json({
		id: req.user.id,
		name: req.user.name,
		first_name: req.user.first_name ? req.user.first_name : first_name,
		last_name: req.user.last_name ? req.user.last_name : last_name,
		email: req.user.email
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

module.exports = router;
