var fs = require("fs"),
    createHtml = {};

createHtml.postHtml = function (path, data) {
    var formattedDate = data.post.date.slice(0, 24).replace(/:/g, "-");

    writeToDisk(path, formattedDate + ".html", buildPostHtml(data));
}

createHtml.userHtml = function (path, data) {
    writeToDisk(path, "index.html", buildUserHtml(data));
    writeToDisk(path + "archive/", "index.html", buildAchriveHtml());
}

function writeToDisk(path, filename, content) {
    // create path if it doesn't already exist
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    fs.writeFile(path + filename, content, function (err) {
        if (err) {
            console.log("Error writing to file: \n" + err);
        }
    });
}

// A single post html for the archives page
function buildPostHtml(data) {
    var htmlDoc =
    "<!DOCTYPE html>" +
        "<html lang=\"zxx\">" +
            "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<title>Archive</title>" +
                "<link href=\"../../../stylesheets/style.css\" rel=\"stylesheet\" type=\"text/css\">" +
                "<link href=\"../../../semantic/dist/semantic.min.css\" rel=\"stylesheet\" type=\"text/css\">" +
            "</head>" +

            "<body>" +
                "<header class=\"ui vertical masthead center aligned segment\">" +
                    "<h1 class=\"ui blue header\">NOW!</h1>" +
                    "<nav>" +
                        "<a href=\"../../../\">Home</a> | <a href=\"../\">Now</a> | <a href=\"/users/" + data.username + "/archive/\">Past</a>" +
                    "</nav>" +
                "</header>" +

                "<main>" +
                    "<div class=\"ui middle aligned center aligned segment\">" +
                        //<img class=\"ui middle aligned center medium rounded image\" src=\"driving.gif\">
                        "<div class=\"content\">" +
                            // Data
                            "<div class=\"post\">" +
                                "<h4>" + data.post.title + "</h4>" +
                                "<img src=\"" + data.post.image + "\">" +
                                "<p>" + data.post.blog + "</p>" +
                                "<p>" + data.post.date + "</p>" +
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
                            "</div>" + 
                        "</div>" + 
                    "</div>" + 
                "</footer>" + 

                "<script src=\"../../../semantic/dist/semantic.min.js\"></script>" + 
                "<script src=\"http://code.jquery.com/jquery-2.0.3.min.js\"></script>" + 
            "</body>" + 
        "</html>";
    return htmlDoc;
}    

// A new user page html
function buildUserHtml(data) {
    var htmlDoc =
    "<!DOCTYPE html>" +
    "<html lang=\"zxx\">" +
        "<head>" +
            "<meta charset=\"UTF-8\">" +
            "<title>Now</title>" +
            "<link href=\"../../stylesheets/style.css\" rel=\"stylesheet\" type=\"text/css\">" +
            "<link href=\"../../semantic/dist/semantic.min.css\" rel=\"stylesheet\" type=\"text/css\">" +
        "</head>" +

        "<body>" +
            "<header class=\"ui vertical masthead center aligned segment\">" +
                "<h1 class=\"ui blue header\">NOW!</h1>" +
                "<nav>" +
                    "<a href=\"../../\">Home</a> | <a href=\"/\">Now</a> | " +
                    "<a href=\"archive/\">Archives</a>" +
                "</nav>" +
            "</header>" +

            "<main>" +
                "<div class=\"ui middle aligned center aligned segment\">" +
                    "<h2 id=\"user-header\" class=\"name\">" + data.username + "</h2>" +
                    "<div class=\"content\">" +
                    "</div>" +
                    "<h3 class=\"ui blue header\">New Post</h3>" +
                    "<div class=\"ui input\">" +
                        "<input class=\"title\" type=\"text\" placeholder=\"Title\">" +
                        "<input type=\"file\" id=\"file-image\">" +
                    "</div>" +
                    "<div class=\"ui form\">" +
                        "<div class=\"inline fields ui grid container centered\">" +                   
                            "<div class=\"field ten wide column \">" +                        
                                "<textarea rows=\"4\" placeholder=\"Enter Your Post's Description Here...\">" +"</textarea>" +
                            "</div>" +                    
                        "</div>" +
                        "<div class=\"button-update\">" +
                            "<input class=\"ui blue submit button\" value=\"Update\" type=\"submit\">" +
                        "</div>" +
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
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</footer>" +

            "<script src=\"../../semantic/dist/semantic.min.js\">" +"</script>" +
            "<script src=\"http://code.jquery.com/jquery-2.0.3.min.js\">" +"</script>" +
            "<script src=\"../../javascripts/now.js\">" +"</script>" +
        "</body>" +
    "</html>"

    return htmlDoc;
}

// A new archive page
function buildAchriveHtml() {
    var htmlDoc =
    "<!DOCTYPE html>" +
    "<html lang=\"zxx\">" +
    "<head>" +
        "<meta charset=\"UTF-8\">" + 
        "<title>Now Archive</title>" +
        "<link href=\"../../../semantic/dist/semantic.min.css\" rel=\"stylesheet\" type=\"text/css\">" +
        "<link href=\"../../../stylesheets/style.css\" rel=\"stylesheet\" type=\"text/css\">" +
    "</head>" +
    "<body>" +
        "<header class=\"ui vertical masthead center aligned segment\">" +
            "<h1 class=\"ui blue header\">Past</h1>" +
            "<nav>" +
                "<a href=\"../../../\">Home</a> | <a href=\"../\">Now</a> | " +
                "<a href=\"/\">Past</a>" +
            "</nav>" +
        "</header>" +
        "<main>" +
            "<div class=\"ui middle aligned center aligned segment\">" +
                "<h2 class=\"ui blue header\">Past Posts</h2>" +
                "<div class=\"past-posts\">" +
                    "<ul>" +
                        
                    "</ul>" +
                "</div>" +
            "</div>" +
        "</main>" +
        "<footer>" +
            "<div class=\"ui vertical footer segment\">" +
                "<div class=\"ui container\">" +
                    "<div class=\"ui center aligned stackable divided equal height stackable grid\">" +
                    "<div class=\"three wide column\">" +
                            "<div class=\"contact\">" +
                                "<h5>Contact U</h5>" +
                                "<p>BATMAN Street</p>" +
                                "<p>BATMAN CAVE</p>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</footer>" +
        "<script src=\"http://code.jquery.com/jquery-2.0.3.min.js\">" +"</script>" +
        "<script src=\"../../../javascripts/past.js\">" +"</script>" +
        "<script src=\"../../../semantic/dist/semantic.min.js\">" +"</script>" +
    "</body>" +
    "</html>";

    return htmlDoc;
}

module.exports = createHtml;