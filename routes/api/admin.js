const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Hire = require('../../models/HiringFor');
const Business = require('../../models/Business');
const Post = require('../../models/Post');
const utils = require( '../../resources/utils');
const Orginization = require('../../models/Orginization');
const Chapter = require('../../models/Chapter');
const authController = require('../../controllers/auth-controller');


//GET API/admin/chapters
//get all chapters
//private
router.get('/chapters', passport.authenticate('jwt', {session: false }), (req, res) => {

    User.findById({_id: req.user.id, is_admin: true}).exec()
    .then(user => {
        if (!user) return res.status(404).json({errors : "You are not an authorized admin user"})
        
        return Chapter.find().sort('name').exec()
    }).then(aChapters => {

        res.json(aChapters);

    })

})

//GET API/admin/chapter/:chapter
//get one chapter
//private
router.get('/chapter/:chapter', passport.authenticate('jwt', {session: false }), (req, res) => {
    User.findById({_id: req.user.id, is_admin: true}).exec()
    .then(user => {
        if (!user) return res.status(404).json({errors : "You are not an authorized admin user"})
        
        return Chapter.findOne({_id: req.params.chapter}).populate('linkedChapter').exec()
    }).then(chapter => {
        res.json(chapter);
    })
})

//GET API/admin/users
//get all users
//private
router.get('/users', passport.authenticate('jwt', {session: false }), (req, res) => {

    User.findById({_id: req.user.id, is_admin: true}).exec()
    .then(user => {
        if (!user) return res.status(404).json({errors : "You are not an authorized admin user"})
        
        return User.find().sort('last_name first_name').exec()
    }).then(aUsers => {

        let cleanUserObjs = authController.sanitizeArrayUserObject(aUsers)
        res.json(cleanUserObjs);

    })

})

//GET API/admin/users
//get all users
//private
router.get('/user/:user', passport.authenticate('jwt', {session: false }), (req, res) => {
    User.findById({_id: req.user.id, is_admin: true}).exec()
    .then(user => {
        if (!user) return res.status(404).json({errors : "You are not an authorized admin user"})
        return User.findOne({_id: req.params.user}).exec()
    }).then(user => {
        let userObj = authController.sanitizeUserObject(user)
        res.json(userObj);
    })
})



module.exports = router;
