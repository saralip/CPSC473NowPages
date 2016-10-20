var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    fs = require("fs"),
    createHtml = require("./createHtml.js"),
    app = express();

app.use(express.static("./client"));
app.use(bodyParser.urlencoded({"extended":"true"}));

// connect to now page data store in mongo
mongoose.connect("mongodb://localhost/nowPage", function () {
    // DELETE THIS LINE BEFORE SUBMITTING
    mongoose.connection.db.dropDatabase();
});
// create schema for post objects
var PostSchema = mongoose.Schema({
    date: String,
    blog: String,
    title: String
});
var Post = mongoose.model("Post", PostSchema);

// create schema for user objects
var UserSchema = mongoose.Schema({
    name: String,
    post: {
        date: String,
        blog: String,
        title: String
    }
});
var User = mongoose.model("User", UserSchema);

http.createServer(app).listen(3000);

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
            var newUser = new User({"name":req.body.username,
                                    "post":req.body.post});

            newUser.save(function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({"message":"Error, try again later"});
                } else {
                    // create new user's html page
                    var path = "client/users/" + req.body.username + "/";
                    createHtml.userHtml(path, req.body);

                    res.json({"message":"New user created!"});
                    // TODO: want to redirect the user to new page
                }
            });
        }
    });
});

app.get("/nowBlog.json", function (req, res) {
    // connect to mongodb to find all the stored posts
    Post.find({}, function (err, posts) {
        if (err !== null) {
            console.log("ERROR: " + err);
            return;
        }
        // send db findings back to client
        res.json(posts);
    });
});

app.post("/nowBlog", function (req, res) {
    // create new post object to store in MongoDB
    var newPost = new Post({"date":req.body.date,
                            "blog":req.body.blogText,
                            "title":req.body.title});
    // store in MongoDB, send result to client
    newPost.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            // send all stored Post data to client
            Post.find({}, function (err, result) {
                if (err !== null) {
                    res.send("ERROR");
                }
                res.json(result);
            });

            // Generate new .html file for the archived data
            // Start by changing the date string to file-creation friendly format
            var formattedDate = req.body.date.slice(0, 24).replace(/:/g, "-");
            var path = "client/archives/" + formattedDate + ".html";
            // Call the createHtml.js module to create new page
            createHtml.postHtml(path, req.body);
        }
    });
});

app.get("/past.json", function (req, res) {
    // return list of archived file names to client
    res.json(fs.readdirSync("client/archives/"));
});


// TODOs: wrap createHtml calls in a try-catch block
//        Delete user ability
//        update navigation links in the htmls