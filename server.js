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
mongoose.connect("mongodb://localhost/nowPage");
// create schema for post objects
var PostSchema = mongoose.Schema({
    date: String,
    blog: String,
    title: String
});
var Post = mongoose.model("Post", PostSchema);

http.createServer(app).listen(3000);

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
            var path = "client/" + formattedDate + ".html";
            // Call the createHtml.js module
            createHtml.postHtml(path, req.body);
        }
    });
});