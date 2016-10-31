var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    createHtml = require('./createHtml.js'),
    app = express();

app.use(express.static('./client'));
// set upload/dl limits to 5mb
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', 'extended':'true'}));

// connect to mlab database for MongoDB storage
mongoose.Promise = global.Promise;
var uri = 'mongodb://misha:473project1@ds135797.mlab.com:35797/473-project1';
mongoose.connect(uri, function () {
    // To clear user list on home page: delete all folders under /users/
    // To clear database, uncomment line below:
    //mongoose.connection.db.dropDatabase();
});
// create schema for storing users and posts
var UserSchema = mongoose.Schema({
    name: String,
    posts: [
        {
            date: String,
            blog: String,
            title: String,
            image: String
        }
    ]
});
var User = mongoose.model('User', UserSchema);

http.createServer(app).listen(3000);
console.log('Server listening on port 3000');

// return list of user .html pages to client
app.get('/users.json', function (req, res) {
    'use strict';
    fs.readdir('client/users/', function (err, userlist) {
        if (err) {
            console.log(err);
        } else {
            res.json(userlist);
        }
    });
});

// create new user if one doesn't already exist
app.post('/newUser', function (req, res) {
    'use strict';
    User.count({name: req.body.username}, function (err, count) {
        if (err) {
            res.json({'message':'Error, try again later'});
        } else if (count > 0) {  // user already exists
            res.json({'message':'Username already exists'});
        } else { // user doesn't exist, create new user
            var newUser = new User();

            newUser.name = req.body.username;
            newUser.posts.push(req.body.post);

            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({'message':'Error, try again later'});
                } else { // create new user's html page and archive
                    var path = 'client/users/' + req.body.username + '/';
                    createHtml.userHtml(path, req.body);
                    createHtml.postHtml(path + 'archive/', req.body);

                    res.json({'message':'New user created!'});
                }
            });
        }
    });
});

// returns list of posts created by requesting user
app.get('/users/:username/nowBlog.json', function (req, res) {
    'use strict';
    User.findOne({'name': req.params.username}, function (err, user) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            res.json(user.posts);
        }
    });
});

// user adds a new post -- store in database
app.post('/nowBlog', function (req, res) {
    'use strict';
    User.findOneAndUpdate(
        {'name': req.body.username},
        {$push: {'posts': req.body.post}},
        {safe: true, new: true, upsert: true, sort: { 'date': 1}},
        function (err, model) {
            if (err) {
                console.log('Post Error:\n' + err);
                res.send('ERROR');
            } else {
                res.json(model);

                // Generate new .html file for the archived data
                var path = 'client/users/' + req.body.username + '/archive/';
                createHtml.postHtml(path, req.body);
            }
        }
    );
});

// returns list of links to a user's archive history
app.get('/users/:username/archive/past.json', function (req, res) {
    'use strict';
    // return list of archived file names to client
    var users = fs.readdir('client/users/' + req.params.username + 
                           '/archive/', function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


// TODOs: Delete user ability
    