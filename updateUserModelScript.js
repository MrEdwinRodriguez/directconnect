const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Chapter = require('./models/Chapter');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch( err => console.log(err));

updateUserCollection()

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



