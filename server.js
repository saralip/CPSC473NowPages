var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    upload,
    nowContent = [
        {
            "date":"Thu Oct 13 2016 18:38:43 GMT-0700 (Pacific Daylight Time)",
            "blog":"cruisin down the street in my '64",
            "title":"Cruising With Robin"
        }
    ];

app.use(express.static("./client"));
app.use(bodyParser.urlencoded({"extended":"true"}));

app.get("/nowBlog.json", function (req, res) {
    res.json(nowContent);
});

app.post("/nowBlog", function (req, res) {
    nowContent.push(req.body);
    res.json({"message":"Posted to the server"});
});

http.createServer(app).listen(3000);