const Validator = require ('validator');
const isEmpty = require ('./is-empty');

module.exports = function validateRegistrationInput(data) {
	let errors = {};
	data.first_name = !isEmpty(data.first_name) ? data.first_name : " "
	data.last_name = !isEmpty(data.last_name) ? data.last_name : " ";
	data.email = !isEmpty(data.email) ? data.email : " ";
	data.password = !isEmpty(data.password) ? data.password : " ";
	data.password2 = !isEmpty(data.password2) ? data.password2 : " ";
	data.inviteCode = !isEmpty(data.inviteCode) ? data.inviteCode: " ";



	if (!Validator.isLength(data.first_name, {min: 2, max: 30 })){
		errors.name = "Name must be between 2 and 30 characters";
	}

	if(isEmpty(data.first_name)) {
		errors.name = "Name field is required";
	}

	if (!Validator.isLength(data.last_name, {min: 2, max: 30 })){
		errors.name = "Name must be between 2 and 30 characters";
	}

	if(isEmpty(data.last_name)) {
		errors.name = "Name field is required";
	}

	if(!Validator.isLength(data.password, {min: 6, max: 30})) {
		errors.password = "Password must be at least 6 characters";
	}

	if(isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if(!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	if(isEmpty(data.password2)) {
		errors.password2= "Confirm password field is required";
	}

	if(isEmpty(data.inviteCode)) {
		errors.inviteCode= "Invite Code is required";
	}

	if(!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	if(isEmpty(data.email)) {
		errors.email = "Email field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}

}