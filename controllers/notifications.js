const Post = require('../models/Post');

function commentNotification () {
    console.log('in notification')
    var oneWeek = new Date(new Date() - 1 * 60 * 60 * 24 * 1000)
    Post.find({comments: { $elemMatch: { date: {$gte: oneWeek}} } } ).populate('user').exec()
    .then(posts => {
        console.log(posts)
        console.log(posts.length)
        let notifyUsersObject = []; //array of objects
        let objectUsers = {}; //used to check if user is already in the array
        posts.forEach(post => {
            let postUserId = post.user._id;
            if(objectUsers[postUserId]){
                 let existingObjectUser = notifyUsersObject.find(user => {
                     return user.userId == postUserId;
                 })
                 let newPostItem = {
                    // post: post.text,
                    commentCount: commentCount,
                }
                existingObjectUser.postItem.push(newPostItem)

            } else {
                commentCount = 0;
                post.comments.forEach(comment => {
                    if(oneWeek < comment.date) {
                        commentCount ++;
                    }
                })
                objectUser = {
                    userId : postUserId,
                    postItem : [
                        {
                            // post: post.text,
                            commentCount: commentCount,
                        }
                    ]
                }
                notifyUsersObject.push(objectUser);
                objectUsers.postUserId = postUserId;
            }
        })
        console.log(notifyUsersObject)
    })

}
exports.commentNotification  = commentNotification;