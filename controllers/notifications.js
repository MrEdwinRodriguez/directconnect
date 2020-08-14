const Post = require('../models/Post');
const Chapter = require('../models/Chapter');
const User = require('../models/User');
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

function getEmailAddresses (sendingChapter, chapters, orginization, region) {
    return new Promise(function (resolve, reject) {
        console.log('getEmailAddress', sendingChapter, chapters, orginization, region)
        let chapterParameters = {};
        let userParameters = {}
        if (chapters) {
            chapterParameters._id = {$in: chapters}; 
            userParameters['email_permissions.linkedChapterNotification']= {$ne: false};
        } else if (sendingChapter) {
            chapterParameters._id = sendingChapter;
            userParameters['email_permissions.chapterNotification']= {$ne: false};
        }
        if (region) {
            chapterParameters.region = region;
            userParameters['email_permissions.localChaptersNotification']= {$ne: false};
        }
        if (orginization) {
            chapterParameters.orginization = orginization;
            userParameters['email_permissions.localChaptersNotification']= {$ne: false};
        }
        Chapter.find(chapterParameters).exec()
        .then(chapters => {
            let chapterIds = chapters.map(chapter => {
                return chapter._id
            })
            userParameters.chapter = {$in: chapterIds}
            return User.find(userParameters, {email: 1, first_name: 1, last_name: 1, email_permissions: 1})
            }).then(aUsers => {
                let emailList = [];
                aUsers.forEach(user => {
                    emailList.push(user.email);
                })
                console.log('email list: ', emailList)
                return resolve(emailList);
        })
    })
}

exports.getEmailAddresses  = getEmailAddresses;


