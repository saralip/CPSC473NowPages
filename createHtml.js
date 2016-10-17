var fs = require("fs"),
    createHtml = {};

createHtml.postHtml = function (path, data) {
    var htmlString = buildPostHtml(data);
    
    fs.writeFile(path, htmlString, function (err) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            console.log("New html saved!");
        }
    });
}

createHtml.listArchives = function () {
    return fs.readdirSync("client/archives/");
}

function buildPostHtml(data) {
    var htmlDoc =
    "<!DOCTYPE html>" +
        "<html lang=\"zxx\">" +
            "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<title>Archive</title>" +
                "<link href=\"../stylesheets/style.css\" rel=\"stylesheet\" type=\"text/css\">" +
                "<link href=\"../semantic/dist/semantic.min.css\" rel=\"stylesheet\" type=\"text/css\">" +
            "</head>" +

            "<body>" +
                "<header class=\"ui vertical masthead center aligned segment\">" +
                    "<h1 class=\"ui blue header\">NOW!</h1>" +
                    "<nav>" +
                        "<a href=\"profile.html\">Profile</a> | <a href=\"index.html\">Now</a> | <a href=" +
                        "\"past.html\">Past</a>" +
                    "</nav>" +
                "</header>" +

                "<main>" +
                    "<div class=\"ui middle aligned center aligned segment\">" +
                        //<img class=\"ui middle aligned center medium rounded image\" src=\"driving.gif\">
                        "<div class=\"content\">" +
                            // ADD DATA HERE
                            "<div class=\"post\">" +
                                "<h2>" + data.title + "</h2>" +
                                "<p>" + data.blogText + "</p>" +
                                "<p>" + data.date + "</p>" +
                            "</div>" +
                            // End
                        "</div>" +
                    "</div>" +
                "</main>" + 

                "<footer>" + 
                    "<div class=\"ui vertical footer segment\">" + 
                        "<div class=\"ui container\">" + 
                            "<div class=\"ui center aligned stackable divided equal height stackable grid\">" + 
                                "<div class=\"three wide column\">" + 
                                    "<div class=\"contact\">" + 
                                        "<h5>Contact Us</h5>" + 
                                        "<p>BATMAN Street</p>" + 
                                        "<p>BATMAN CAVE</p>" + 
                                    "</div>" + 
                                "</div>" + 
                                "<div class=\"three wide column\">" + 
                                    "<div class=\"sitemap\">" + 
                                        "<h5>Sitemap</h5>" + 
                                        "<ul>" + 
                                            "<li>" + 
                                                "<a href=\"index.html\">Home</a>" + 
                                            "</li>" + 
                                            "<li>" + 
                                                "<a href=\"#\">About Us</a>" + 
                                            "</li>" + 
                                        "</ul>" + 
                                    "</div>" + 
                                "</div>" + 
                            "</div>" + 
                        "</div>" + 
                    "</div>" + 
                "</footer>" + 

                "<script src=\"../semantic/dist/semantic.min.js\"></script>" + 
                "<script src=\"http://code.jquery.com/jquery-2.0.3.min.js\"></script>" + 
            "</body>" + 
        "</html>";
    return htmlDoc;
}    

module.exports = createHtml;