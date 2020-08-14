const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Orginization = require('../../models/Orginization');
const Chapter = require('../../models/Chapter');
const notificationsController = require('../../controllers/notifications');
const Emails = require('../../controllers/emails');



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

//post API/orginization/sendEmail
//send email to orginization
//private
// getEmailAddress (sendingChapter,  orginization, region)
router.post('/sendEmail', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('send email to org')
    let sendTo = req.body.sendTo;
    User.findOne({_id: req.user.id}).exec()
    .then(user => {
        mainChapterId = user.chapter[0];
        return Chapter.find({_id: mainChapterId}).populate('linkedChapter orginization').exec()
    }).then(chapter => {
        return Orginization.populate(chapter, {path:'linkedChapter.orginization' })
    }).then(async aChapter => {
        let chapter = aChapter[0];
        let region = chapter.region;
        let emailAddresses = null;
        if (sendTo == 'chapter') {
            emailAddresses = notificationsController.getEmailAddresses(chapter._id, null, null, null)
            .then(emailAddresses => {
                callAdminSendEmail(emailAddresses, req.body.subject, req.body.content)
            })
        } else if (sendTo == 'linked') {
            let chapters = [chapter._id, chapter.linkedChapter._id]
            emailAddresses = notificationsController.getEmailAddresses(chapter._id, chapters, null, null)
            .then(emailAddresses => {
                callAdminSendEmail(emailAddresses, req.body.subject, req.body.content)
            })
        } else if (sendTo == 'region') { 
            emailAddresses = notificationsController.getEmailAddresses(null, null, chapter.orginization._id, region)
            .then(emailAddresses => {
                callAdminSendEmail(emailAddresses, req.body.subject, req.body.content)
        })
        } else if (sendTo == 'region_orginization') { 
            emailAddresses = notificationsController.getEmailAddresses(null,  null, null,  region)
            .then(emailAddresses => {
                callAdminSendEmail(emailAddresses, req.body.subject, req.body.content)
            })
        } else {
            return res.status(400).json({sendTo: "Please select who to send this email to."});
        }

        function callAdminSendEmail (emails, subject, content) {
            let sent = Emails.adminSendEmail(emails, subject, content)
            .then(sent => {
                console.log('Email(s) have been sent.')
                res.json({ sent: true });
            })
        }

       
    })


    // res.json({ sent: true });
	
});
module.exports = router;