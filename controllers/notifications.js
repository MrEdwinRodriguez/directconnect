const Post = require('../models/Post');
const Emails = require('./Emails');

function commentNotification () {
    console.log('in notification')
    var oneWeek = new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
    Post.find({comments: { $elemMatch: { date: {$gte: oneWeek}} } } ).populate('user').exec()
    .then(posts => {
        let notifyUsersObject = []; //array of objects
        let objectUsers = {}; //used to check if user is already in the array
        posts.forEach(post => {
            let postUserId = post.user._id;
            let postUser = post.user;
            if(objectUsers[postUserId]){
                 let existingObjectUser = notifyUsersObject.find(user => {
                     return user.userId == postUserId;
                 })
                 let newPostItem = {
                    post: post.text,
                    user: postUser,
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
                            post: post.text,
                            user: postUser,
                            commentCount: commentCount,
                        }
                    ]
                }
                notifyUsersObject.push(objectUser);
                objectUsers[postUserId] = postUserId;
            }
        })
        notifyUsersObject.forEach(user => {
            let listString = '<ul>';
            let userSending = "";
            user.postItem.forEach(post => {
                userSending = post.user;
                listString += '<li>Comment: '+post.post.substring(0, 6)+".../Comments: "+post.commentCount +"</li>"
            })
            listString += "</ul>"
            Emails.sendCommentNotifications(userSending, listString)
        })
    })

}
exports.commentNotification  = commentNotification;