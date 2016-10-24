var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    fs = require("fs"),
    createHtml = require("./createHtml.js"),
    app = express();

app.use(express.static("./client"));
// set upload/dl limits to 5mb
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", "extended":"true"}));

// connect to now page data store in mongo
mongoose.connect("mongodb://localhost/nowPage", function () {
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
var User = mongoose.model("User", UserSchema);

http.createServer(app).listen(3000);
console.log("Server listening on port 3000");

app.get("/users.json", function (req, res) {
    // return list of user .html pages to client
    res.json(fs.readdirSync("client/users/"));
});

// create new user if one doesn't already exist
app.post("/newUser", function (req, res) {
    User.count({name: req.body.username}, function (err, count) {
        if (err) {
            res.json({"message":"Error, try again later"});
        } else if (count > 0) {  // user already exists
            res.json({"message":"Username already exists"});
        } else { // user doesn't exist, create new user
            var newUser = new User();

            newUser.name = req.body.username;
            newUser.posts.push(req.body.post);

            newUser.save(function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({"message":"Error, try again later"});
                } else { // create new user's html page and archive
                    var path = "client/users/" + req.body.username + "/";
                    createHtml.userHtml(path, req.body);
                    createHtml.postHtml(path + "archive/", req.body);

                    res.json({"message":"New user created!"});
                    // TODO: want to redirect the user to the new page (res.redirect("path"))
                }
            });
        }
    });
});

app.get("/users/:username/nowBlog.json", function (req, res) {
    User.findOne({"name": req.params.username}, function (err, user) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            res.json(user.posts);
        }
    });
});

app.post("/nowBlog", function (req, res) {
    User.findOneAndUpdate(
        {"name": req.body.username},
        {$push: {"posts": req.body.post}},
        {safe: true, new: true, upsert: true, sort: { "date": 1}},
        function (err, model) {
            if (err) {
                console.log("Post Error:\n" + err);
                res.send("ERROR");
            } else {
                res.json(model);

                // Generate new .html file for the archived data
                var path = "client/users/" + req.body.username + "/archive/";
                createHtml.postHtml(path, req.body);
            }
        }
    );
});

app.get("/users/:username/archive/past.json", function (req, res) {
    // return list of archived file names to client
    res.json(fs.readdirSync("client/users/" + req.params.username + "/archive/"));
});


// TODOs: update navigation links in the htmls
//        Upload images!
//        Delete user ability
//        wrap createHtml calls in a try-catch block
//        remove index.html from archives page
//        fix navigation link in archived pages
    