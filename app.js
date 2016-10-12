var main = function () {
    "use strict";

    var updateNowPage = function () {
        var $blogText = $("<p>").text($("textarea").val()),
            currentDate = new Date(),
            $date = $("<p>").text(currentDate),
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

$(document).ready(main);


//TODO: add some kind of paragraph functionality to textarea
//      add image upload
//      add archiving