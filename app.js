var main = function () {
    "use strict";

    var postToServer = function () {
        var currentDate = new Date(),
            $date = $("<p>").text(currentDate),
            $blogText = $("<p>").text($("textarea").val()),
            $title = $("<h2>").text($("input.title").val()),
            postContent;

        postContent = {
            "title" : $("input.title").val(),
            "blogText" : $("textarea").val(),
            "date" : new Date()
        };

        $.post("now", postContent, function (response) {    // "now" or "/now"?

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

    $(".button-update input").on("click", function () {
        updateNowPage();

    });
}

$(document).ready(function () {
    $.get("now.json", function (nowContent) {
        main(nowContent);
    });
});


//TODO: add some kind of paragraph functionality to textarea
//      add image upload
//      add archiving