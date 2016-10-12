var main = function () {
    "use strict";

    var updateNowPage = function () {
        var $blogText = $("<p>").text($("textarea").val()),
            currentDate = new Date(),
            $date = $("<p>").text(currentDate);

        $("main .content").append($blogText)
                          .append($date);

        // Clear input boxes
        $("textarea").val("");
        $(".date").val("");
    };

    $(".button-update input").on("click", function () {
        updateNowPage();

    });
}

$(document).ready(main);