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


router.get('/test', (req,res) => res.json({msg: "Users works"}));

//GET API/users/register
//register user
//public

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegistrationInput(req.body);

	//check Validation
	if(!isValid) {
		return res.status(400).json(errors);
	};

	inviteCodeArray = ['iotarho1978', 'sigmaepsilon1978', "gammadeltasigma1951", "epsilonepsilonzeta1954"]
	if (inviteCodeArray.indexOf(req.body.inviteCode) == -1) {
		return res.status(400).json(errors.name = "Enter a Valid Invite Code")
	}

	User.findOne({email : req.body.email })
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
				name: req.body.name,
				email: req.body.email,
				inviteCode: req.body.inviteCode,
				avatar,
				password: req.body.password
			})

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				})
			})
		}
	})
});

//GET API/users/login
//login user / return JWT token
//public
router.post('/login', (req, res) => {

	const { errors, isValid } = validateLoginInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	};

	const email = req.body.email;
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
						name: user.name, 
						avatar: user.avatar,
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


//GET API/users/current
//return current user
//private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});













module.exports = router;