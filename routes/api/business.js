const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const Hire = require('../../models/HiringFor');
const Business = require('../../models/Business');
const validateBusinessInput = require('../../validation/business');

//POST API/business
//create post
//private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBusinessInput(req.body);
	if(!isValid) {
		return res.status(400).json(errors);
    };
    const newBusiness = new Business()
    newBusiness.user= req.user.id;
    newBusiness.name = req.body.name;
    newBusiness.title = req.body.title;
    newBusiness.description = req.body.description;
    newBusiness.location= req.body.location;
    newBusiness.website= req.body.website;
    newBusiness.created_on= new Date();
    console.log(newBusiness)
    newBusiness.save()
    .then(function(business) {
        res.json(business)
    })
    .catch(err => res.status(404).json({ message: 'Could not create new business' }))
})

//GET API/business
//get all business
//private
router.get('/', passport.authenticate('jwt', {session: false }), (req, res) => {
	const errors = {};
	Business.find({})
		.populate('user', ['name', 'avatar', 'email'])
		.lean()
		.then(businesses => {
            businesses.forEach(function(business){
                business.contactName = business.user.name;
                business.contactEmail = business.user.email;
                business.contactPhone = business.honeNumber ? business.honeNumber : "";
            })
			res.json(businesses)
		})
		.catch(err => res.status(404).json(err));
});
//GET API/business/:business
//get business by id
//public
router.get('/:business', (req, res) => {
	const errors = {};
	const businessQueried = req.params.business;
	Business.findOne({_id: businessQueried})
		.populate('user', ['name', 'avatar', 'email'])
		.lean()
		.then(business => {
			if(!business) {
				errors.nobusiness = "There is no business found";
				res.status(400). json(errors)
			}
			business.contactName = business.user.name;
			business.email = business.user.email;
			business.phoneNumber = business.user.phoneNumber;
			res.json(business)
		})
		.catch(err => res.status(404).json(err));

});

//PUT API/business/:business_id
//PUT one business
//private
router.put('/:business_id', passport.authenticate('jwt', {session: false }), (req, res) => {
    const businessQueried = req.params.business_id;
	Business.findOne({_id: businessQueried})
		.then(business => {
			if(!business) {
				errors.nobusiness = "There was no business found";
				res.status(400). json(errors)
			}
            business.name = req.body.name;
            business.title = req.body.title;
            business.location = req.body.location;
            business.description = req.body.description;
            business.website = req.body.website;
            business.updated_on = new Date();
			business.save()
				.then(business => res.json(business))
	})
	.catch(err => res.status(404).json(err))
})
    
//DELETE API/business/:business_id
//Delete business
//private
router.delete('/:business_id', passport.authenticate('jwt', {session: false }), (req, res) => {
    const businessQueried = req.params.business_id;
    const authUser = req.user.id;
    let profileFound = null;
	Business.findOne({_id: businessQueried})
		.then(business => {
            if(!business) {
                console.log('this is not an existing business')
                errors.nobusiness = "There is no business found";
				res.status(400). json(errors)
            }
            business.remove()
            .then(() => {
                Profile.findOne({user: authUser}).lean().exec()
                .then((profile) => {
                    profileFound = profile;
                    return Hire.find({user: authUser}).lean().exec()
                })
                .then(positions => {
                    profileFound.hiringFor = positions;
                    return Business.find({user: authUser}).lean().exec()
                })
                .then(businesses => {
                    profileFound.business = businesses;
                    res.json(profileFound)
        })     
	})
		.catch(err => res.status(404).json({ postnotfound: 'No business found' }))
    });
});


module.exports = router;
