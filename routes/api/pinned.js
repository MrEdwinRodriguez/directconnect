const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
const Pinned = require('../../models/Pinned');


// GET api/pinned
// Get pinned messages
// Private
router.get( '/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('in pinned')
    let userId = req.user.id;
    User.findOne({_id: userId })
    .then(user => {
        if (!user) {
            return res.status(404).json({error: "No user found"})
        }
        let pinned_params = {
        is_archived: false,
        $or : [
            {expire: {$gte: new Date()}},
            {expire: null}
        ]
        }
        if (user.viewed_pinned_messages) {
        pinned_params._id = { $nin: user.viewed_pinned_messages }
        }
        return Pinned.find(pinned_params)
        .sort({ date: -1 })
        .lean()
        .exec()
    })
      .then(pinnedMessages => {
        console.log('here', pinnedMessages)
        res.json({pinned: pinnedMessages})
      })
      .catch(err => res.status(404).json(err));
});

// put api/pinned/:pinId
// delete pinned message
// Private
router.put('/:pin_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('in put pinned')

    User.findOne({_id: req.user.id})
    .then(user => {
        if (!user) {
            return res.status(404).json({error: "No user found"})
        }
        viewed_pins = user.viewed_pinned_messages ? user.viewed_pinned_messages : [];
        viewed_pins.push(req.params.pin_id);
        user.viewed_pinned_messages = viewed_pins;
        // user.save().then(user => res.json({pinned: pinnedMessages}));
        user.save((err, user) => {
            console.log('updated viewed pinned messages', user)
            if (!user) {
                return res.status(404).json({error: "User was update, but did not return correctly"})
            }
            let pinned_params = {
                is_archived: false,
                $or : [
                    {expire: {$gte: new Date()}},
                    {expire: null}
                ]
                }
            if (user.viewed_pinned_messages) {
                pinned_params._id = { $nin: user.viewed_pinned_messages }
            }
            Pinned.find(pinned_params).sort({ date: -1 }).lean().exec(function (err, pinnedMessages){
                if (err) {
                    return res.send(err)
                } else {
                    console.log('got pinned Messages', pinnedMessages)
                    return res.json({pinned: pinnedMessages})
                }
            })
            // .then(pinnedMessages => {
            //     console.log('got pinned Messages', pinnedMessages)
                
            //     return res.json({pinned: pinnedMessages})
            // })

        })
        // user.save(function(err, user, ) {
        //     console.log('updated viewed pinned messages', user)
        //     if (!user) {
        //         return res.status(404).json({error: "User was update, but did not return correctly"})
        //     }
        //     let pinned_params = {
        //         is_archived: false,
        //         $or : [
        //             {expire: {$gte: new Date()}},
        //             {expire: null}
        //         ]
        //         }
        //         if (user.viewed_pinned_messages) {
        //          pinned_params._id = { $nin: user.viewed_pinned_messages }
        //         }
        //         return Pinned.find(pinned_params).sort({ date: -1 }).lean().exec()
        //         .then(pinnedMessages => {
        //             console.log('got pinned Messages', pinnedMessages)
        //             c
        //             return res.json({pinned: pinnedMessages})
        //         })
        // })
            
    })
    .catch(err => res.status(404).json(err));
})


  module.exports = router;