var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
    // nowContent = [
    //     {
    //         "date":"Thu Oct 13 2016 18:38:43 GMT-0700 (Pacific Daylight Time)",
    //         "blog":"cruisin down the street in my '64",
    //         "title":"Cruising With Robin"
    //     }
    // ];

app.use(express.static("./client"));
app.use(bodyParser.urlencoded({"extended":"true"}));
// connect to now page data store in mongo
mongoose.connect("mongodb://localhost/nowPage");    // '/now' or something else?

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
        }
    });
});