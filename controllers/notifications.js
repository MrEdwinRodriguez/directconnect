const Post = require('../models/Post');

function commentNotification () {
    console.log('in notification')
    var oneWeek = new Date(new Date() - 1 * 60 * 60 * 24 * 1000)
    Post.findOne({comments: { $elemMatch: { date: {$gte: oneWeek}} } } ).exec()
    .then(post => {
        console.log(post)
    })

}
exports.commentNotification  = commentNotification;