var main = function (nowContent) {
    "use strict";

    // Add posts stored on server to .content block
    nowContent.forEach(function (update) {
        var $blogPost = $("<div>").addClass("post");

        $blogPost.append($("<h2>").text(update.title));
        $blogPost.append($("<p>").text(update.blog));
        $blogPost.append($("<p>").text(update.date));

        $("main .content").prepend($blogPost);
        
        // Remove any posts older than the last 5
        if ($(".post").length > 5) {
            $("main .content div:nth-child(6)").remove();
        }
    });

    // Upload button click handler
    $(".button-update input").on("click", function () {
        postToServer();
        updateNowPage();
    });

    var postToServer = function () {
        var postContent;

        postContent = {
            "title" : $("input.title").val(),
            "blogText" : $("textarea").val(),
            "date" : new Date()
        };

        $.post("nowBlog", postContent, function (response) {
            console.log(response);
        });
    };

    var updateNowPage = function () {
        var currentDate = new Date(),
            $date = $("<p>").text(currentDate),
            $blogText = $("<p>").text($("textarea").val()),
            $title = $("<h2>").text($("input.title").val()),
            $content = $("<div>").addClass("post");

        $content.append($title)
                .append($blogText)
                .append($date);

        $("main .content").prepend($content);

        if ($(".post").length > 5) {
            $("main .content div:nth-child(6)").remove();
        }

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


//TODO: add image upload
//      add archiving
//      store data persistently instead of in memory