const Post = require('../models/Post');
const Emails = require('./emails');

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
                let textSubstring = post.post.length > 15 ? post.post.substring(0, 14) : post.post;
                listString += '<li><strong>Post</strong>: '+textSubstring+".../<strong># of New Comments</strong>: "+post.commentCount +"</li>"
            })
            listString += "</ul>"
            Emails.sendCommentNotifications(userSending, listString)
        })
    })

}
exports.commentNotification  = commentNotification;

//sendingChapter chapter ID
//include array of chapters to include in email.  Including sendingFrom chapter
//include is optional
// function getEmailAddress (sendTo, sendingChapter, include) {

//     let emails = null;
//     if(sendTo == 'chapter') {
//         emails = getChapterEmails(sendingChapter)
//         .then(emails => {
//             return emails
//         })
//     } else if (sendTo == 'linked') {
//         emails = getLinkedChapterEmails(include)
//         .then(emails => {
//             return emails
//         })
//     } else if (sendTo == 'local') {
//         emails = getLocalChapterEmails()
//         .then(emails => {
//             return emails
//         })
//     } else {
//         emails = getFullNetworkEmails()
//         .then(emails => {
//             return emails
//         })
//     }
    
// }

function getChapterEmails (chapter) {
    return new Promise(function (resolve, reject) {
    User.find({ chapter: chapter, "email_permissions.chapterNotification": true }).exec()
    .then(users => {
        return users;
    })
    return resolve (users);
    })
}

function getLinkedChapterEmails () {
    return new Promise(function (resolve, reject) {
        User.find({ chapter: { $in: include }, "email_permissions.linkedChapterNotification": true }).exec()
        .then(users => {
            return users;
        })
        return resolve (users);
        })
}

function getLocalChapterEmails () {
    return new Promise(function (resolve, reject) {
        User.find({ chapter: { $in: include }, "email_permissions.localChaptersNotification": true }).exec()
        .then(users => {
            return users;
        })
        return resolve (users);
        })

}

function getFullNetworkEmails () {
    return new Promise(function (resolve, reject) {
        User.find({ chapter: { $in: include }, "email_permissions.fullNetworkNotification": true }).exec()
        .then(users => {
            return users;
        })
        return resolve (users);
        })
}