var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    upload,
    nowContent = [
        {
            "date":"10-11-55",
            "blog":"cruisin down the street in my '64",
            "title":"Crusin With Robin"
        }
    ];

app.use(express.static("./client"));        // ./client or __dirname + /client?
app.use(bodyParser.urlencoded({"extended":"true"}));

app.get("/nowBlog.json", function (req, res) {
    res.json(nowContent);
});

app.post("/nowBlog", function (req, res) {
    nowContent.push(req.body);
     res.json({"message":"Posted to the server"});
});

http.createServer(app).listen(3000);