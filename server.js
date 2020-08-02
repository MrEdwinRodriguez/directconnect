const express = require('express');
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const hire = require('./routes/api/hire');
const pinned = require('./routes/api/pinned');
const business = require('./routes/api/business');
const content = require('./routes/api/content');
const path = require('path');
var cron = require('node-cron');
var notifications = require('./controllers/notifications');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch( err => console.log(err));

//passport middleware
app.use(passport.initialize());



//passpord Config
require('./config/passport')(passport);
app.use(fileUpload());
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/hire', hire);
app.use('/api/business', business);
app.use('/api/pinned', pinned);
app.use('/api/content', content);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}


const port = process.env.PORT || 5000;

// cron job setup here
//Every sunday at 3:00 pm eastern
cron.schedule('0 15 * * Sun', function(){
	console.log('sending comment notification')
	notifications.commentNotification();
  }, undefined, true, "US/Eastern");


app.listen(port, () => console.log(`Server running on port ${port}`));