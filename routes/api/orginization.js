const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Orginization = require('../../models/Orginization');
const Chapter = require('../../models/Chapter');



//GET API/orginization/getEmailList
//return orginizations for emails
//private
router.get('/getEmailList', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('getEmailList')
    let authuserId = req.user.id;
	User.findOne({_id: req.user.id}).exec()
	.then(user => {
        mainChapterId = user.chapter[0];
        return Chapter.find({_id: mainChapterId}).populate('linkedChapter orginization').exec()
    }).then(chapter => {
        return Orginization.populate(chapter, {path:'linkedChapter.orginization' })
    }).then(chapter => {
		res.json(chapter);
	});	
});

module.exports = router;