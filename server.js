var http = require("http"),
    express = require("express"),
    app = express();

app.use(express.static("./client"));

http.createServer(app).listen(3000);