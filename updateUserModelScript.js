const User = require('./models/User');
const Chapter = require('./models/Chapter');


function updateUserCollection () {
    console.log('add chapters and orginizations to user model')
    let chapters = null;
    let users = null;
    User.find( { $or: [ { chapter: null }, { orginization: null } ] }, {inviteCode: 1, name: 1} ).exec()
    .then(aUsers => {
        console.log('aUsers', aUsers)
        users = aUsers;
        return Chapter.find({}).exec()
    }).then(aChaptrs => {
        chapters = aChaptrs;
        users.forEach(user => {
            chapters.forEach(chapter => {
                if(chapter.invite_code+"" == user.inviteCode+"") {
                    user.orginization = chapter.orginization;
                    user.chapter = [chapter._id];
                    console.log('updatedUser before save: ', user)
                    user.save()						
                    .then(user => {
                        console.log('user saved:',  user.name)
                       return true;
                    })
                }
            })
        });
    
    
    })

}

exports.updateUserCollection = updateUserCollection;



