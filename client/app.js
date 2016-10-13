var main = function (nowContent) {
    "use strict";

    var titles, blogs, dates;

    // Seperate the content text received from the server into arrays
    titles = nowContent.map(function (content) {
        return content.title;
    });
    blogs = nowContent.map(function (content) {
        return content.blog;
    });
    dates = nowContent.map(function (content) {
        return content.date;
    });

    // Add server's content to .content block
    nowContent.forEach(function (update) {
        $("main .content").prepend($("<p>").text(update.date));
        $("main .content").prepend($("<p>").text(update.blog));
        $("main .content").prepend($("<h2>").text(update.title));
    });

    // Upload button click handler
    $(".button-update input").on("click", function () {
        //postToServer();
        updateNowPage();
    });

    var postToServer = function () {
        var postContent;

        postContent = {
            "title" : $("input.title").val(),
            "blogText" : $("textarea").val(),
            "date" : new Date()
        };

        $.post("now", postContent, function (response) {    // "now" or "/now"?
            console.log(response);
        });
    };

    var updateNowPage = function () {
        var currentDate = new Date(),
            $date = $("<p>").text(currentDate),
            $blogText = $("<p>").text($("textarea").val()),
            $title = $("<h2>").text($("input.title").val());

        $("main .content").prepend($date)
                          .prepend($blogText)
                          .prepend($title);

        // Clear input boxes
        $("textarea").val("");
        $(".date").val("");
        $("input.title").val("");
    };
};

$(document).ready(function () {
    $.get("nowBlog.json", function (nowContent) {
        main(nowContent);
    });
});


//TODO: add some kind of paragraph functionality to textarea
//      add image upload
//      add archiving