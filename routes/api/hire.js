const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const HiringFor = require('../../models/HiringFor');
const validateHiringInput = require('../../validation/hiring');

router.get('/test', (req,res) => res.json({msg: "Posts works"}));
// GET api/posts
// // Get posts
// // Public
// router.get('/', (req, res) => {
//   Post.find()
//     .sort({ date: -1 })
//     .then(posts => res.json(posts))
//     .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
// });

// // GET api/posts/:id
// // Get post by id
// // Public
// router.get('/:id', (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => res.json(post))
//     .catch(err =>
//       res.status(404).json({ nopostfound: 'No post found with that ID' })
//     );
// });
// 

//POST API/hire
//create post
//private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateHiringInput(req.body);
    var createdPosition = null;
	if(!isValid) {
		return res.status(400).json(errors);
    };
    
    const newPosition = new HiringFor()
    newPosition.user= req.user.id;
    newPosition.company= req.body.company;
    newPosition.position= req.body.position;
    newPosition.description= req.body.description;
    newPosition.location= req.body.location;
    newPosition.pay= req.body.pay;
    newPosition.frequency= req.body.frequency;
    newPosition.created_on= new Date();
    newPosition.save()
    .then(function(position) {
        res.json(position)
    })

})

//GET API/hire/:position
//get hiring position by handle
//public
router.get('/:position', (req, res) => {
	const errors = {};
	const positionQueried = req.params.position;
	HiringFor.findOne({_id: positionQueried})
		.populate('user', ['name', 'avatar', 'email'])
		.lean()
		.then(position => {
			if(!position) {
				errors.noposition = "There is no position found";
				res.status(400). json(errors)
			}
			position.contactName = position.user.name;
			position.email = position.user.email;
			position.phoneNumber = position.user.phoneNumber;
			res.json(position)
		})
		.catch(err => res.status(404).json(err));

});

//PUT API/hire/:hire_id
//PUT  one hire
//private
router.put('/:hire_id', passport.authenticate('jwt', {session: false }), (req, res) => {
    const positionQueried = req.params.hire_id;
	HiringFor.findOne({_id: positionQueried})
		.then(position => {
			if(!position) {
				errors.noposition = "There is no position found for this user";
				res.status(400). json(errors)
			}
            position.company = req.body.company;
            position.position = req.body.position;
            position.location = req.body.location;
            position.description = req.body.description;
            position.pay = req.body.pay;
            position.frequency = req.body.frequency;
            position.contactName = req.body.contactName;
            position.email = req.body.email;
            position.phoneNumber = req.body.phoneNumber;
			position.save()
				.then(position => res.json(position))
	})
	.catch(err => res.status(404).json(err))
})
    

//DELETE API/hire/:hire_id
//Delete position for hiring
//private
router.delete('/:hire_id', passport.authenticate('jwt', {session: false }), (req, res) => {
    const positionQueried = req.params.hire_id;
	HiringFor.findOne({_id: positionQueried})
		.then(position => {
            if(!position) {
                console.log('this is not an existing position')
                errors.noposition = "There is no position found for this user";
				res.status(400). json(errors)
            }

            position.remove()
            .then(() => {
                Profile.findOne({user: req.user.id}).exec()
                .then((profile) => {
                res.json(profile)	
            }) 
        })     
	})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }))
});



module.exports = router;

